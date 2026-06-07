import { NextResponse } from 'next/server';
import { importFile, getOperation } from '@/lib/gemini';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Helper function to wait for operation completion
async function waitForCompletion(operationName: string, maxAttempts = 60): Promise<any> {
  for (let i = 0; i < maxAttempts; i++) {
    const operation = await getOperation(operationName);
    console.log(`[Poll ${i + 1}/${maxAttempts}] Operation status:`, operation.done ? 'DONE' : 'PENDING');

    if (operation.done) {
      if (operation.error) {
        throw new Error(`Operation failed: ${operation.error.message || JSON.stringify(operation.error)}`);
      }
      return operation;
    }

    // Wait 2 seconds before next poll
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  throw new Error('Operation timed out. Please check the file store manually.');
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const storeName = formData.get('storeName') as string;
    const metadataStr = formData.get('metadata') as string;

    if (!file || !storeName) {
      return NextResponse.json({ error: 'File and storeName are required' }, { status: 400 });
    }

    let customMetadata = [];
    if (metadataStr) {
      try {
        customMetadata = JSON.parse(metadataStr);
      } catch (e) {
        console.warn('Failed to parse metadata JSON', e);
      }
    }

    console.log('[Upload] Starting file upload:', file.name, 'Size:', file.size, 'Type:', file.type);

    // 1. Upload using manual multipart construction
    const uploadUrl = `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${GEMINI_API_KEY}`;

    // Create the multipart body manually as a Buffer
    const boundary = `----WebKitFormBoundary${Date.now()}`;

    const metadataJson = JSON.stringify({
      file: {
        display_name: file.name,
      },
    });

    // Build multipart body
    const parts: Buffer[] = [];

    // Metadata part
    parts.push(
      Buffer.from(
        `--${boundary}\r\n` +
        `Content-Type: application/json; charset=UTF-8\r\n` +
        `Content-Disposition: form-data; name="metadata"\r\n\r\n` +
        `${metadataJson}\r\n`
      )
    );

    // File part headers
    parts.push(
      Buffer.from(
        `--${boundary}\r\n` +
        `Content-Type: ${file.type}\r\n` +
        `Content-Disposition: form-data; name="file"; filename="${file.name}"\r\n\r\n`
      )
    );

    // File content
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    parts.push(fileBuffer);
    parts.push(Buffer.from(`\r\n--${boundary}--\r\n`));

    // Combine all parts
    const multipartBody = Buffer.concat(parts);

    console.log('[Upload] Sending multipart request, body size:', multipartBody.length);

    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
      },
      body: multipartBody,
    });

    console.log('[Upload] Response status:', uploadResponse.status, uploadResponse.statusText);

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error('[Upload] Error response:', errorText);
      let errorMessage = 'Failed to upload file to Gemini';
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error?.message || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const uploadData = await uploadResponse.json();
    console.log('[Upload] Success, file name:', uploadData.file?.name);
    const fileName = uploadData.file.name;

    // 2. Import to File Search Store with optional metadata
    console.log('[Import] Starting import to store:', storeName);
    const importResult = await importFile(storeName, fileName, customMetadata);
    console.log('[Import] Operation started:', importResult.name);

    // 3. Wait for import operation to complete
    const completedOperation = await waitForCompletion(importResult.name);
    console.log('[Import] Import completed successfully');

    return NextResponse.json({
      success: true,
      file: uploadData.file,
      importOperation: completedOperation,
    });
  } catch (error: any) {
    console.error('[Upload Error]', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
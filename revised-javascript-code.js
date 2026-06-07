// Revised JavaScript for handling binary file uploads in N8N
// Use this in the "Code in JavaScript" node

return items.map(item => {
    // Get all binary field names
    const binaryKeys = Object.keys(item.binary || {});
    console.log('Available binary fields:', binaryKeys);

    // Find the uploaded file binary
    let fileBinaryKey = null;
    let fileBinary = null;

    // Method 1: Check for "Upload File" (default form field name)
    if (item.binary && item.binary['Upload File']) {
        fileBinaryKey = 'Upload File';
        fileBinary = item.binary['Upload File'];
        console.log('Found file in Upload Field');
    }
    // Method 2: Check for "data" field
    else if (item.binary && item.binary.data) {
        fileBinaryKey = 'data';
        fileBinary = item.binary.data;
        console.log('Found file in data field');
    }
    // Method 3: Use first available binary field
    else if (binaryKeys.length > 0) {
        fileBinaryKey = binaryKeys[0];
        fileBinary = item.binary[binaryKeys[0]];
        console.log('Using first binary field:', fileBinaryKey);
    }

    // If no binary file found, return error
    if (!fileBinary) {
        return {
            json: {
                error: 'No file uploaded',
                message: 'Please select a file to upload',
                availableBinaryFields: binaryKeys
            }
        };
    }

    // Get file info from form data
    const uploadedFileInfo = item.json['Upload File'] || {};
    const filename = uploadedFileInfo.filename || fileBinaryKey || 'unknown-file';
    const mimetype = uploadedFileInfo.mimetype || fileBinary.mimeType || 'application/octet-stream';
    const filesize = uploadedFileInfo.size || fileBinary.fileSize || 0;

    console.log('Processing file:', filename);
    console.log('File size:', filesize);
    console.log('MIME type:', mimetype);

    // Create new binary object with 'data' key for HTTP Request
    const newBinary = {
        data: fileBinary
    };

    // Return structured data
    return {
        json: {
            filename: filename,
            mimetype: mimetype,
            size: filesize,
            submittedAt: item.json.submittedAt || new Date().toISOString(),
            formMode: item.json.formMode || 'form',
            originalBinaryKey: fileBinaryKey,
            fileDisplayName: filename,
            uploadSuccess: true
        },
        binary: newBinary
    };
});
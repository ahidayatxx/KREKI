// Fixed JavaScript for N8N - properly handles binary for HTTP Request node

return items.map(item => {
    // Get all binary field names
    const binaryKeys = Object.keys(item.binary || {});
    console.log('Available binary fields:', binaryKeys);

    // Find the uploaded file binary
    let fileBinaryKey = null;
    let fileBinary = null;

    // Try different possible field names
    const possibleKeys = ['Upload File', 'data', 'file'];

    for (const key of possibleKeys) {
        if (item.binary && item.binary[key]) {
            fileBinaryKey = key;
            fileBinary = item.binary[key];
            console.log('Found file in field:', key);
            break;
        }
    }

    // If still not found, use first available
    if (!fileBinary && binaryKeys.length > 0) {
        fileBinaryKey = binaryKeys[0];
        fileBinary = item.binary[binaryKeys[0]];
        console.log('Using first available binary field:', fileBinaryKey);
    }

    // If no binary file found, return error
    if (!fileBinary) {
        return {
            json: {
                error: 'No file uploaded',
                message: 'Please select a file to upload',
                availableBinaryFields: binaryKeys,
                hasBinary: !!item.binary
            }
        };
    }

    // Get file info
    const uploadedFileInfo = item.json['Upload File'] || {};
    const filename = uploadedFileInfo.filename || fileBinaryKey || 'unknown-file';
    const mimetype = uploadedFileInfo.mimetype || fileBinary.mimeType || 'application/octet-stream';
    const filesize = uploadedFileInfo.size || fileBinary.fileSize || 0;

    console.log('File details:', { filename, mimetype, filesize });

    // IMPORTANT: Return the binary with the SAME structure as received
    // Don't change the key name, just pass through the binary data
    const result = {
        json: {
            filename: filename,
            mimetype: mimetype,
            size: filesize,
            submittedAt: item.json.submittedAt,
            formMode: item.json.formMode,
            fileKey: fileBinaryKey  // Store which key we found
        }
    };

    // Add binary data with ORIGINAL key name
    result.binary = {};
    result.binary[fileBinaryKey] = fileBinary;

    console.log('Returning binary with key:', fileBinaryKey);

    return result;
});
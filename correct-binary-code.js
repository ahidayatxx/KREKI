return items.map(item => {
    // Get all binary field names
    const binaryKeys = Object.keys(item.binary || {});
    console.log('Available binary fields:', binaryKeys);

    // Find any binary file
    let fileBinary = null;
    let sourceKey = null;

    // Look for any binary file
    if (binaryKeys.length > 0) {
        // Try 'Upload File' first (form trigger default)
        if (item.binary['Upload File']) {
            sourceKey = 'Upload File';
            fileBinary = item.binary['Upload File'];
            console.log('Using Upload File field');
        }
        // Try 'data' next
        else if (item.binary.data) {
            sourceKey = 'data';
            fileBinary = item.binary.data;
            console.log('Using existing data field');
        }
        // Use first available
        else {
            sourceKey = binaryKeys[0];
            fileBinary = item.binary[binaryKeys[0]];
            console.log('Using first available field:', sourceKey);
        }
    }

    // If no binary file found
    if (!fileBinary) {
        console.error('No binary file found!');
        return {
            json: {
                error: 'No file uploaded',
                availableBinaryFields: binaryKeys,
                hasBinary: !!item.binary
            }
        };
    }

    // Get file information
    const uploadedFileInfo = item.json['Upload File'] || {};
    const filename = uploadedFileInfo.filename || fileBinary.fileName || sourceKey || 'unknown';
    const mimetype = uploadedFileInfo.mimetype || fileBinary.mimeType || 'application/octet-stream';
    const filesize = uploadedFileInfo.size || fileBinary.fileSize || 0;

    console.log('File detected:', { filename, mimetype, filesize, sourceKey });

    // Create the output
    const output = {
        json: {
            filename: filename,
            mimetype: mimetype,
            size: filesize,
            submittedAt: item.json.submittedAt,
            sourceKey: sourceKey,
            hasBinary: true
        },
        binary: {}
    };

    // IMPORTANT: Always set binary field to 'data'
    // This is what the HTTP Request node expects
    output.binary.data = fileBinary;

    console.log('Binary data ready with key: data');

    return output;
});
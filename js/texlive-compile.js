/**
 * Submits multiple files to texlive.net for LaTeX processing
 * @param {Object[]} files - Array of file objects with {name: string, content: string}
 * @param {Object} options - Configuration options
 * @param {string} options.engine - LaTeX engine (pdflatex, lualatex, xelatex, etc.)
 * @param {string} options.bibcmd - Bibliography command (biber, bibtex, etc.)
 * @param {string} options.return - Return format (pdfjs, pdf, log, make4ht, etc.)
 * @param {string[]} options.makeindex - Array of makeindex options
 * @returns {Promise<Response>} Response from the texlive.net server
 */
async function submitToTexlive(files, options = {}) {
    // Validate inputs
    if (!Array.isArray(files) || !files.length) {
        throw new Error('Files array must be non-empty');
    }

    // Check if document.tex exists in files
    if (!files.some(file => file.name === 'document.tex')) {
        throw new Error('Files must include document.tex');
    }

    // Valid engine options
    const validEngines = [
        'lualatex', 'pdflatex', 'xelatex', 'uplatex', 'platex', 'latex',
        'lualatex-dev', 'pdflatex-dev', 'xelatex-dev', 'uplatex-dev', 
        'platex-dev', 'latex-dev', 'luatex', 'pdftex', 'xetex', 'uptex', 
        'ptex', 'tex', 'optex', 'context', 'asy'
    ];

    // Valid return options
    const validReturnTypes = ['pdfjs', 'pdf', 'log', 'make4ht', 'LaTeXML', 'lwarp'];
    
    // Valid bibliography commands
    const validBibCmds = ['biber', 'bibtex', 'pbibtex', 'bibtex8'];

    // Create FormData object
    const formData = new FormData();

    // Add engine if specified and valid
    if (options.engine) {
        if (!validEngines.includes(options.engine)) {
            throw new Error(`Invalid engine. Must be one of: ${validEngines.join(', ')}`);
        }
        formData.append('engine', options.engine);
    }

    // Add return format if specified and valid
    if (options.return) {
        if (!validReturnTypes.includes(options.return)) {
            throw new Error(`Invalid return type. Must be one of: ${validReturnTypes.join(', ')}`);
        }
        formData.append('return', options.return);
    }

    // Add bibliography command if specified and valid
    if (options.bibcmd) {
        if (!validBibCmds.includes(options.bibcmd)) {
            throw new Error(`Invalid bibliography command. Must be one of: ${validBibCmds.join(', ')}`);
        }
        formData.append('bibcmd', options.bibcmd);
    }

    // Add makeindex options if specified
    if (options.makeindex && Array.isArray(options.makeindex)) {
        options.makeindex.forEach(opt => {
            // Validate makeindex option - only allow -, ., letters and digits
            if (!/^[-.\w]+$/.test(opt)) {
                throw new Error('Invalid makeindex option. Only -, ., letters and digits are allowed');
            }
            formData.append('makeindex[]', opt);
        });
    }

    // Add files
    files.forEach(file => {
        if (!file.name || typeof file.content !== 'string') {
            throw new Error('Each file must have name and content properties');
        }
        formData.append('filename[]', file.name);
        formData.append('filecontents[]', file.content);
    });

    // Submit to texlive.net
    try {
        const response = await fetch('https://texlive.net/cgi-bin/latexcgi', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
    } catch (error) {
        throw new Error(`Failed to submit to texlive.net: ${error.message}`);
    }
}
// TeXLive form handler
class TeXLiveForm {
  constructor(options = {}) {
    this.targetUrl = options.targetUrl || 'https://texlive.net/cgi-bin/latexcgi';
    this.defaultEngine = options.defaultEngine || 'pdflatex';
  }

  createForm(files, options = {}) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = this.targetUrl;
    form.enctype = 'multipart/form-data';
    form.target = '_blank'; // Otevře výsledek v novém okně

    // Přidání engine pole
    if (options.engine) {
      const engineInput = document.createElement('input');
      engineInput.type = 'hidden';
      engineInput.name = 'engine';
      engineInput.value = options.engine;
      form.appendChild(engineInput);
    }

    // Přidání bibcmd pole
    if (options.bibcmd) {
      const bibcmdInput = document.createElement('input');
      bibcmdInput.type = 'hidden';
      bibcmdInput.name = 'bibcmd';
      bibcmdInput.value = options.bibcmd;
      form.appendChild(bibcmdInput);
    }

    // Přidání makeglossaries pole
    if (options.makeglossaries) {
      const glossariesInput = document.createElement('input');
      glossariesInput.type = 'hidden';
      glossariesInput.name = 'makeglossaries';
      glossariesInput.value = options.makeglossaries;
      form.appendChild(glossariesInput);
    }

    // Přidání return pole
    const returnInput = document.createElement('input');
    returnInput.type = 'hidden';
    returnInput.name = 'return';
    returnInput.value = options.return || 'pdf';
    form.appendChild(returnInput);

    // Přidání makeindex polí
    if (options.makeindex && Array.isArray(options.makeindex)) {
      options.makeindex.forEach(indexOpt => {
        const indexInput = document.createElement('input');
        indexInput.type = 'hidden';
        indexInput.name = 'makeindex[]';
        indexInput.value = indexOpt;
        form.appendChild(indexInput);
      });
    }

    // Přidání souborů
    files.forEach((file, index) => {
      // Filename pole
      const filenameInput = document.createElement('input');
      filenameInput.type = 'hidden';
      filenameInput.name = 'filename[]';
      filenameInput.value = file.name;
      form.appendChild(filenameInput);

      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.name = 'filecontents[]';
      // podpora pro binární soubory. použít klíč blob místo content (viz letaky.html)
      const dataTransfer = new DataTransfer();
      const fileObject = new File([file.blob || file.content], file.name, {
        type: file.type || 'application/octet-stream',
      });
      dataTransfer.items.add(fileObject);
      fileInput.files = dataTransfer.files;
      form.appendChild(fileInput);
    });

    return form;
  }

  submit(files, options = {}) {
    const form = this.createForm(files, options);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }
}

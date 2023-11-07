export default class MyUploadAdapter {
    constructor( loader ) {
        console.log('MyUploadAdapter')
        // The file loader instance to use during the upload.
        this.loader = loader;
    }

    // Starts the upload process.
    // upload() {
    //     return this.loader.file
    //         .then( file => new Promise( ( resolve, reject ) => {
    //             this._initRequest();
    //             this._initListeners( resolve, reject, file );
    //             this._sendRequest( file );
    //         } ) );
    // }

    // // Aborts the upload process.
    // abort() {
    //     if ( this.xhr ) {
    //         this.xhr.abort();
    //     }
    // }

    upload() {
    return new Promise( ( resolve, reject ) => {
            // 使用 FileReader() 物件讀取檔案
            const reader = this.reader = new window.FileReader();
            // 觸發 load 事件後，resolve 丟回物件完成 Promise
            reader.addEventListener( 'load', () => {
            resolve( { default: reader.result } );
            } );
            
            // 觸發錯誤事件，以 reject 丟回 Promise 失敗原因
            reader.addEventListener( 'error', err => {
            reject( err );
            } );
            // 觸發 abort 事件時，以 reject() ，使 Promise 失敗
            reader.addEventListener( 'abort', () => {
            reject();
            } );
            
            // 告訴 FileReader 物件用 url 格式讀取，用於設定 img.src 性質
            this.loader.file.then( file => {
            reader.readAsDataURL( file );
            } );
        } );
    }
    
    // start abort()
    abort() {
        //  觸發 FileReader abort 事件
        this.reader.abort();
    }

    // Initializes the XMLHttpRequest object using the URL passed to the constructor.
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();

        // Note that your request may look different. It is up to you and your editor
        // integration to choose the right communication channel. This example uses
        // a POST request with JSON as a data structure but your configuration
        // could be different.
        xhr.open( 'POST', 'http://example.com/image/upload/path', true );
        xhr.responseType = 'json';
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners( resolve, reject, file ) {
        
        const xhr = this.xhr;
        const loader = this.loader;
        console.log('xhr',xhr)
        console.log('loader',loader)
        const genericErrorText = `Couldn't upload file: ${ file.name }.`;

        xhr.addEventListener( 'error', () => reject( genericErrorText ) );
        xhr.addEventListener( 'abort', () => reject() );
        xhr.addEventListener( 'load', () => {
            const response = xhr.response;

            // This example assumes the XHR server's "response" object will come with
            // an "error" which has its own "message" that can be passed to reject()
            // in the upload promise.
            //
            // Your integration may handle upload errors in a different way so make sure
            // it is done properly. The reject() function must be called when the upload fails.
            if ( !response || response.error ) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            // This URL will be used to display the image in the content. Learn more in the
            // UploadAdapter#upload documentation.
            resolve( {
                default: response.url
            } );
        } );

        // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
        // properties which are used e.g. to display the upload progress bar in the editor
        // user interface.
        if ( xhr.upload ) {
            xhr.upload.addEventListener( 'progress', evt => {
                if ( evt.lengthComputable ) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            } );
        }
    }

    // Prepares the data and sends the request.
    _sendRequest( file ) {
        // Prepare the form data.
        const data = new FormData();

        data.append( 'upload', file );

        // Important note: This is the right place to implement security mechanisms
        // like authentication and CSRF protection. For instance, you can use
        // XMLHttpRequest.setRequestHeader() to set the request headers containing
        // the CSRF token generated earlier by your application.

        // Send the request.
        this.xhr.send( data );
    }
}
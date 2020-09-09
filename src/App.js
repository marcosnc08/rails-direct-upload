import React from 'react';

import { DirectUpload } from "@rails/activestorage"

function App() {
  
  const uploadFile = (file) => {
    // your form needs the file_field direct_upload: true, which
    //  provides data-direct-upload-url
    
    const url = "https://70a5beaba59d.ngrok.io/v1/direct_uploads"
    const upload = new DirectUpload(file, url)
  
    upload.create((error, blob) => {
      if (error) {
        console.log(error);
        // Handle the error
      } else {
        // Add an appropriately-named hidden input to the form with a
        //  value of blob.signed_id so that the blob ids will be
        //  transmitted in the normal upload flow
        const hiddenField = document.createElement('input')
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("value", blob.signed_id);
        hiddenField.name = file.name
      }
    })
  }
  
  return (
    <div className="App">
      <input type="file" onChange={(event) => uploadFile(event.target.files[0], 'file')}/>
    </div>
  );
}

export default App;

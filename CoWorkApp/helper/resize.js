
let imageResizer = require('react-native-image-resizer').default;

// export function resize(imageUri, width, height){  
//   console.log(imageResizer.createResizedImage())
//   imageResizer.createResizedImage(imageUri, width, height,'PNG')
//     .then(response => {
//         return response;
//       // response.uri is the URI of the new image that can now be displayed, uploaded...
//       // response.path is the path of the new image
//       // response.name is the name of the new image with the extension
//       // response.size is the size of the new image
//     })
//     .catch(err => {
//       // Oops, something went wrong. Check that the filename is correct and
//       // inspect err to get more details.
//       console.log(err);
//       console.log('Can\'t resize image');
//     });
// }
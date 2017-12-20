export default function( reducerFn, userObj, historyObj, optionalSuccessRedirect, optionalAlreadyAuthenticatedUrl, optionalFunctions ) {
  const currentPath = historyObj.location.pathname;

  // User has refreshed the page. The user object is no longer stored in the store. Let's re-authenticate.
  if ( userObj === null ) {
    reducerFn( historyObj, currentPath, optionalSuccessRedirect || null );
  } else if ( userObj !== null && optionalAlreadyAuthenticatedUrl ) {
    // User has landed on this page through routing and the user object is still in the store.
    // If the function has been provided with an alreadyAuthenticatedUrl, use the historyObj to route there.
    historyObj.push( optionalAlreadyAuthenticatedUrl );
  } else if ( userObj !== null && optionalFunctions ) {
    // User has landed on this page through routing and the user object is still in the store.
    // If the function has been provided with an optionalFunctions array, execute them.
    for( var i = 0; i < optionalFunctions.length; i++ ) {
      // console.log('Firing function:', optionalFunctions[ i ]);
      // console.log('Using parameters:', optionalFunctions[ i ].params);
      optionalFunctions[ i ].fn.apply(null, optionalFunctions[ i ].params);
    }
  }
}
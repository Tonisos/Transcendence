// Extract the code from the URL
var code = new URLSearchParams(window.location.search).get('code');
console.log('Authorization code:', code);

// Exchange the code for an access token
function exchangeCodeForToken(code) {
  console.log('Exchanging code for token...');
  var params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', 'u-s4t2ud-931353ac1c257ec9468c1a83405c55262ca58e255d891f8471de8fba9d3ca612');
  params.append('client_secret', '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');
  params.append('code', code);
  params.append('redirect_uri', 'http://localhost:5500/login/post-login.html');

  fetch('https://api.intra.42.fr/oauth/token', {
    method: 'POST',
    body: params
  })
  .then(response => {
    console.log('Token response:', response);
    return response.json();
  })
  .then(data => {
    console.log('Access token received:', data);
    var accessToken = data.access_token;
    fetchUserProfile(accessToken);
  })
  .catch(error => console.error('Error exchanging code for token:', error));
}

// Fetch and display the user's profile information
function fetchUserProfile(accessToken) {
    console.log('Fetching user profile...');
    fetch('https://api.intra.42.fr/v2/me', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }
      console.log('Profile response:', response);
      return response.json();
    })
    .then(userProfile => {
      console.log('User profile:', userProfile);
      document.getElementById('user-name').textContent = userProfile.login;
      document.getElementById('profile-picture').src = userProfile.image.link;
    })
    .catch(error => console.error('Error fetching user profile:', error));
}
  

// Start the token exchange process if a code is present
if (code) {
  exchangeCodeForToken(code);
}
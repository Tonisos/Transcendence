document.getElementById('signInButton').addEventListener('click', function() {
    // Replace with your OAuth2 authorization URL
    var authUrl = 'https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-931353ac1c257ec9468c1a83405c55262ca58e255d891f8471de8fba9d3ca612&redirect_uri=https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-931353ac1c257ec9468c1a83405c55262ca58e255d891f8471de8fba9d3ca612&redirect_uri=http%3A%2F%2Flocalhost%3A5500%2Fpong.html&response_type=code&response_type=code&response_type=code&scope=public';
    window.location.href = authUrl;
  });
  
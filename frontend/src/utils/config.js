const CONFIG = {
  'development': {
    'backendURL': 'http://localhost:3000'
  },
  'production': {
    'backendURL': 'https://webhook.ninja'
  }
}


export function getBackendURL() {
  return CONFIG[process.env.NODE_ENV].backendURL;
}
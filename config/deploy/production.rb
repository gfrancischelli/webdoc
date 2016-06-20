set :stage, :production
server '104.131.105.81', user: 'deploy', roles: %w{web app db}

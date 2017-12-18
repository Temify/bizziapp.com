# Welcome to new Bizzi Web

## Development
`$ yarn start`

## Deploy
Deployment is automatic via circle.ci. Every commit to master is automatically deployed to the production server. Commit to any other branch is deplyed to test server `web.bizziapp.com`

### Important
Do not delete whole `/public` directory. Due to bug in gulp only delete the exact category you need wiped (cs, js or views).
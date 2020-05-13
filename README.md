# Polis
pol.is an AI powered sentiment gathering platform. More organic than surveys, less effort than focus groups.

## Development

Our reference development environment is built on Docker.

We expect it to run either locally with vanilla `docker` or remotely with `docker-machine`.
(e.g., on [DigitalOcean with 2GB memory][do-tut])

   [do-tut]: https://www.digitalocean.com/community/tutorials/how-to-provision-and-manage-remote-docker-hosts-with-docker-machine-on-ubuntu-16-04

```
GIT_HASH=$(git log --pretty="%h" -n 1) docker-compose up --build --detach
docker-machine ip
>>> 123.45.67.89
```

Visit your instance at one of: \
`http://123.45.67.89.xip.io/` \
`https://123.45.67.89.xip.io/` (insecure; browser warning)

Sign up at `/createuser` path. You'll be logged in right away; no email validation required!

### Misc Notes

- HTTPS is served via a self-signed SSL certificate. It's intended only for development purposes, e.g., Facebook auth.

**What features still need work?**
- ~~Generated reports~~
- Data export [`polis-issues#137`](https://github.com/pol-is/polis-issues/issues/137)

## :rocket: Deployment

Please see [`docs/deployment.md`](/docs/deployment.md)

## :copyright: License

[AGPLv3](/LICENSE)

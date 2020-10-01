FROM nginx:1.19-alpine

# the port nginx will listen on
# you can either change it here, or by using --env PORT=1234 when running the container
ENV PORT=8080

COPY ./docker/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY ./build/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

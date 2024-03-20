# Use the Nginx image
FROM nginx:latest

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]

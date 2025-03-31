# Sử dụng Node.js image chính thức
FROM node:18

# RUN apt-get update && apt-get install -y mariadb-client

# Đặt thư mục làm việc
WORKDIR /app

# Copy file package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code vào container
COPY . .

# Expose cổng chạy server
EXPOSE 5000

# Lệnh chạy ứng dụng
CMD ["npm", "run", "backend"]

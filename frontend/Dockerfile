# Sử dụng Node.js image chính thức
FROM node:18

# Đặt thư mục làm việc
WORKDIR /app

# Copy file package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code vào container
COPY . .

# Lệnh chạy ứng dụng
RUN npm run build
CMD ["npm", "run", "dev"]

# Expose cổng chạy server
EXPOSE 5173

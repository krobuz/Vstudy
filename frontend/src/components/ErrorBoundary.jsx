import React, { useState, useEffect } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    if (hasError) {
      // Nếu có lỗi, bạn có thể thực hiện một số tác vụ khi có lỗi, ví dụ như gửi thông báo lỗi đến server.
      console.error(error, errorInfo);
    }
  }, [hasError, error, errorInfo]); // Chạy khi hasError, error hoặc errorInfo thay đổi

  const handleError = (error, errorInfo) => {
    setError(error);
    setErrorInfo(errorInfo);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div style={{ padding: "20px", backgroundColor: "#f8d7da", color: "#721c24", borderRadius: "4px" }}>
        <h2>Something went wrong!</h2>
        <details style={{ whiteSpace: "pre-wrap" }}>
          {error && error.toString()}
          <br />
          {errorInfo ? errorInfo.componentStack : "No component stack available"}
        </details>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;

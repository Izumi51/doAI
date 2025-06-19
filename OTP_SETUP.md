# EmailJS OTP Setup Instructions

This guide will help you set up the OTP system using EmailJS for your doAI application.

## Prerequisites

1. **EmailJS Account**: Sign up at [https://www.emailjs.com/](https://www.emailjs.com/)
2. **Redis Server**: Install and run Redis locally or use a cloud provider
3. **Email Service**: Gmail, Outlook, or any SMTP service

## 1. EmailJS Setup

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down the **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template:

```html
Subject: Your OTP Code - doAI

Hi {{user_name}},

Your One-Time Password (OTP) for doAI is:

{{otp_code}}

This code will expire in 5 minutes. Please do not share this code with anyone.

If you didn't request this code, please ignore this email.

Best regards,
doAI Team
```

4. Save the template and note down the **Template ID**

### Step 4: Get API Keys
1. Go to "Account" settings
2. Find your **Public Key** and **Private Key**
3. Keep these secure

## 2. Redis Setup

### Option A: Local Redis (Recommended for Development)
1. Download Redis from [https://redis.io/download](https://redis.io/download)
2. Install and start Redis server:
   ```bash
   # Windows (if using Redis for Windows)
   redis-server.exe
   
   # Linux/Mac
   redis-server
   ```
3. Redis will run on `localhost:6379` by default

### Option B: Cloud Redis
- Use services like Redis Cloud, AWS ElastiCache, or Azure Redis Cache
- Get the connection details (host, port, password)

## 3. Backend Configuration

### Step 1: Environment Variables
Create a `.env` file in your backend root directory or set these environment variables:

```env
# EmailJS Configuration
EMAILJS_SERVICE_ID=your_service_id_here
EMAILJS_TEMPLATE_ID=your_template_id_here
EMAILJS_PUBLIC_KEY=your_public_key_here
EMAILJS_PRIVATE_KEY=your_private_key_here

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DATABASE=0
```

### Step 2: Update Application Properties
The `application.properties` file has already been configured to use these environment variables.

## 4. Testing the Setup

### Step 1: Start Services
1. Start Redis server
2. Start your Spring Boot backend:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
3. Start your React frontend:
   ```bash
   cd frontend
   npm run dev
   ```

### Step 2: Test OTP Flow
1. Navigate to `http://localhost:5173/otp-demo` (assuming default Vite port)
2. Enter an email address
3. Click "Send OTP"
4. Check your email for the OTP code
5. Enter the 6-digit code to verify

## 5. Integration with Your App

### Using the OTP Components

```jsx
import OtpFlow from '../components/Auth/OtpFlow';

function MyComponent() {
    const handleOtpComplete = (email) => {
        console.log('OTP verified for:', email);
        // Handle successful verification
    };

    return (
        <OtpFlow 
            onComplete={handleOtpComplete}
            title="Verify Your Email"
        />
    );
}
```

### Individual Components

```jsx
import OtpRequest from '../components/Auth/OtpRequest';
import OtpVerification from '../components/Auth/OtpVerification';

// For requesting OTP
<OtpRequest onOtpSent={(email) => console.log('OTP sent to:', email)} />

// For verifying OTP
<OtpVerification 
    email="user@example.com" 
    onVerified={(email) => console.log('Verified:', email)}
    onCancel={() => console.log('Cancelled')}
/>
```

## 6. Security Considerations

1. **Environment Variables**: Never commit your EmailJS keys to version control
2. **Rate Limiting**: Consider implementing rate limiting for OTP requests
3. **Email Validation**: Validate email addresses before sending OTPs
4. **Redis Security**: Use password authentication for Redis in production
5. **HTTPS**: Always use HTTPS in production

## 7. Customization

### Modify OTP Settings
Edit the constants in `OtpService.java`:

```java
private static final int OTP_LENGTH = 6;           // Change OTP length
private static final int OTP_EXPIRY_MINUTES = 5;   // Change expiry time
```

### Custom Email Template
Modify the template parameters in `OtpService.java` `sendOtpEmail` method:

```java
templateParams.put("to_email", email);
templateParams.put("otp_code", otp);
templateParams.put("user_name", email.split("@")[0]);
// Add more parameters as needed
```

## 8. Troubleshooting

### Common Issues

1. **EmailJS API Error**: Check your service ID, template ID, and keys
2. **Redis Connection Error**: Ensure Redis is running and accessible
3. **CORS Issues**: Check your CORS configuration in `SecurityConfig.java`
4. **OTP Not Received**: Check spam folder, verify EmailJS service setup

### Debug Mode
Enable debug logging in `application.properties`:

```properties
logging.level.com.doAI.backend.service.OtpService=DEBUG
logging.level.org.springframework.data.redis=DEBUG
```

## 9. Production Deployment

1. **Environment Variables**: Set all required environment variables
2. **Redis**: Use a managed Redis service
3. **EmailJS**: Upgrade to a paid plan for higher limits
4. **Monitoring**: Set up monitoring for OTP delivery success rates
5. **Backup**: Consider fallback email services

---

## API Endpoints

### Request OTP
```http
POST /api/auth/otp/request
Content-Type: application/json

{
    "email": "user@example.com"
}
```

### Verify OTP
```http
POST /api/auth/otp/verify
Content-Type: application/json

{
    "email": "user@example.com",
    "otp": "123456"
}
```

Both endpoints return JSON responses with `message` field and verification endpoint includes `valid` boolean field.


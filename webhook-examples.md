# Webhook Examples for AI CRM System

This document contains sample webhook payloads for testing Instagram and WhatsApp integration.

## Instagram Webhook

### Endpoint
```
POST /api/webhooks/instagram
```

### Sample Payload 1 - New Lead Inquiry
```json
{
  "sender": "priya.sharma",
  "message": "Hi, I need bridal makeup for my wedding on Dec 10 in Mumbai. Budget around 45k. Can you help?",
  "timestamp": "2024-11-01T10:00:00Z",
  "platform": "INSTAGRAM",
  "user_id": "ig_12345",
  "conversation_id": "conv_67890"
}
```

### Sample Payload 2 - Service Inquiry
```json
{
  "sender": "rajesh.kumar",
  "message": "Hello! We need photography for our corporate event on Nov 15 in Delhi. Budget 75k. Can you provide details?",
  "timestamp": "2024-11-01T11:00:00Z",
  "platform": "INSTAGRAM",
  "user_id": "ig_67890",
  "conversation_id": "conv_12345"
}
```

### Sample Payload 3 - Follow-up Message
```json
{
  "sender": "meera.reddy",
  "message": "Hi! Need makeup for birthday party on Nov 30 in Hyderabad. Budget 35k. Available?",
  "timestamp": "2024-11-01T12:00:00Z",
  "platform": "INSTAGRAM",
  "user_id": "ig_11111",
  "conversation_id": "conv_22222"
}
```

## WhatsApp Webhook

### Endpoint
```
POST /api/webhooks/whatsapp
```

### Sample Payload 1 - Wedding Planning Inquiry
```json
{
  "sender": "vikram.singh",
  "message": "Referred by friend for complete wedding planning in Pune on Jan 20. Budget 2L. Need full service.",
  "timestamp": "2024-11-01T13:00:00Z",
  "platform": "WHATSAPP",
  "phone_number": "+91-98765-43213",
  "conversation_id": "wa_conv_33333"
}
```

### Sample Payload 2 - Photography Inquiry
```json
{
  "sender": "arjun.malhotra",
  "message": "Looking for product photography services in Chennai. Budget 60k. Event on Dec 5.",
  "timestamp": "2024-11-01T14:00:00Z",
  "platform": "WHATSAPP",
  "phone_number": "+91-98765-43215",
  "conversation_id": "wa_conv_44444"
}
```

### Sample Payload 3 - Decoration Inquiry
```json
{
  "sender": "anjali.patel",
  "message": "Looking for wedding decoration services in Bangalore for Dec 25. Budget 1.2L. Please contact me.",
  "timestamp": "2024-11-01T15:00:00Z",
  "platform": "WHATSAPP",
  "phone_number": "+91-98765-43212",
  "conversation_id": "wa_conv_55555"
}
```

## Expected AI Processing Results

### Entity Extraction Example
```json
{
  "extracted_entities": {
    "name": "Priya Sharma",
    "city": "Mumbai",
    "date": "2024-12-10",
    "budget": "45000",
    "service": "bridal makeup",
    "event_type": "wedding"
  },
  "confidence_score": 0.95
}
```

### AI Summary Example
```
"Lead requesting bridal makeup in Mumbai on Dec 10, budget 45k. High-quality inquiry with specific requirements."
```

### Next Action Suggestion Example
```
"Send bridal makeup portfolio and pricing. Follow up in 2 days. Schedule consultation call."
```

## Testing with cURL

### Instagram Webhook Test
```bash
curl -X POST http://localhost:8080/api/webhooks/instagram \
  -H "Content-Type: application/json" \
  -d '{
    "sender": "test.user",
    "message": "Hi, I need photography for my event on Dec 15 in Mumbai. Budget 50k.",
    "timestamp": "2024-11-01T16:00:00Z",
    "platform": "INSTAGRAM",
    "user_id": "ig_test_123",
    "conversation_id": "conv_test_456"
  }'
```

### WhatsApp Webhook Test
```bash
curl -X POST http://localhost:8080/api/webhooks/whatsapp \
  -H "Content-Type: application/json" \
  -d '{
    "sender": "test.user",
    "message": "Looking for makeup services in Delhi. Budget 40k for Dec 20.",
    "timestamp": "2024-11-01T17:00:00Z",
    "platform": "WHATSAPP",
    "phone_number": "+91-98765-43210",
    "conversation_id": "wa_conv_test_789"
  }'
```

## Postman Collection

Import the following collection into Postman for easy testing:

```json
{
  "info": {
    "name": "AI CRM Webhooks",
    "description": "Webhook endpoints for Instagram and WhatsApp integration"
  },
  "item": [
    {
      "name": "Instagram Webhook",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "url": "http://localhost:8080/api/webhooks/instagram",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"sender\": \"test.user\",\n  \"message\": \"Hi, I need photography for my event on Dec 15 in Mumbai. Budget 50k.\",\n  \"timestamp\": \"2024-11-01T16:00:00Z\",\n  \"platform\": \"INSTAGRAM\",\n  \"user_id\": \"ig_test_123\",\n  \"conversation_id\": \"conv_test_456\"\n}"
        }
      }
    },
    {
      "name": "WhatsApp Webhook",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "url": "http://localhost:8080/api/webhooks/whatsapp",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"sender\": \"test.user\",\n  \"message\": \"Looking for makeup services in Delhi. Budget 40k for Dec 20.\",\n  \"timestamp\": \"2024-11-01T17:00:00Z\",\n  \"platform\": \"WHATSAPP\",\n  \"phone_number\": \"+91-98765-43210\",\n  \"conversation_id\": \"wa_conv_test_789\"\n}"
        }
      }
    }
  ]
}
```

## Response Format

All webhook endpoints return a consistent response format:

```json
{
  "success": true,
  "message": "Webhook processed successfully",
  "data": {
    "lead_id": 123,
    "deal_id": 456,
    "ai_analysis": {
      "extracted_entities": {...},
      "summary": "...",
      "next_action": "..."
    }
  },
  "timestamp": "2024-11-01T18:00:00Z"
}
```

## Error Handling

### Invalid Payload
```json
{
  "success": false,
  "message": "Invalid webhook payload",
  "errors": [
    "sender is required",
    "message is required"
  ],
  "timestamp": "2024-11-01T18:00:00Z"
}
```

### Processing Error
```json
{
  "success": false,
  "message": "Error processing webhook",
  "error": "AI service temporarily unavailable",
  "timestamp": "2024-11-01T18:00:00Z"
}
```

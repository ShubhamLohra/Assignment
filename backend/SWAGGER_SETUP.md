# Swagger/OpenAPI Documentation Setup

## Overview
This project now includes comprehensive API documentation using SpringDoc OpenAPI (Swagger 3) for Spring Boot 3.x.

## Access Points

### Swagger UI
- **URL**: http://localhost:8080/swagger-ui.html
- **Description**: Interactive API documentation interface where you can:
  - View all available endpoints
  - Test API calls directly from the browser
  - See request/response schemas
  - View parameter descriptions and examples

### OpenAPI JSON
- **URL**: http://localhost:8080/api-docs
- **Description**: Raw OpenAPI specification in JSON format
- **Use Cases**: 
  - Import into Postman or other API testing tools
  - Generate client SDKs
  - Integration with other documentation tools

## 🚨 Important Fixes Applied

### 1. Context Path Issue
**Issue Resolved**: The application was previously configured with `server.servlet.context-path=/api` which caused double `/api` prefixes in URLs, resulting in 404 errors.

**Solution**: Removed the context path configuration so your controllers work correctly with their existing `/api/*` mappings.

### 2. Hibernate Lazy Loading Issue
**Issue Resolved**: Jackson serialization was failing with Hibernate lazy loading proxies, causing 500 Internal Server Errors.

**Solutions Applied**:
- Added `@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})` to lazy-loaded fields
- Created `LeadResponseDTO` to safely handle entity serialization
- Added `LeadMapper` utility for entity-to-DTO conversion
- Created `JacksonConfig` for global serialization settings
- Updated controller methods to return DTOs instead of entities

## Available API Groups

### 1. Lead Management
- **Tag**: Lead Management
- **Endpoints**:
  - `GET /api/leads` - Get all leads
  - `GET /api/leads/{id}` - Get lead by ID
  - `POST /api/leads` - Create new lead
  - `PUT /api/leads/{id}` - Update lead
  - `DELETE /api/leads/{id}` - Delete lead
  - `GET /api/leads/stats/dashboard` - Get lead statistics

### 2. Service Management
- **Tag**: Service Management
- **Endpoints**:
  - `GET /api/services` - Get all services
  - `GET /api/services/active` - Get active services only
  - `GET /api/services/{id}` - Get service by ID
  - `POST /api/services` - Create new service

### 3. Deal Management
- **Tag**: Deal Management
- **Endpoints**:
  - `GET /api/deals` - Get all deals
  - `GET /api/deals/{id}` - Get deal by ID
  - `POST /api/deals` - Create new deal
  - `PUT /api/deals/{id}` - Update deal
  - `DELETE /api/deals/{id}` - Delete deal
  - `GET /api/deals/stage/{stage}` - Get deals by stage
  - `GET /api/deals/stats/pipeline` - Get pipeline statistics

### 4. Health Check
- **Tag**: Health Check
- **Endpoints**:
  - `GET /health` - Basic health status
  - `GET /health/info` - Detailed system information

## Features

### Interactive Testing
- Test API endpoints directly from Swagger UI
- View request/response examples
- See validation errors and responses

### Comprehensive Documentation
- Detailed parameter descriptions
- Request/response schemas
- HTTP status codes
- Example values

### Search and Filter
- Search through endpoints
- Filter by tags
- Sort operations by method or name

## Configuration

The Swagger configuration is located in:
- **Config Class**: `com.aicrm.config.SwaggerConfig`
- **Properties**: `application.properties` (springdoc.* properties)

## Customization

### Adding New Endpoints
When adding new controllers or endpoints, use these annotations:

```java
@Tag(name = "Your Tag", description = "Description of your API group")
@Operation(summary = "Summary", description = "Detailed description")
@ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Success"),
    @ApiResponse(responseCode = "400", description = "Bad Request")
})
@Parameter(description = "Parameter description")
```

### Entity Documentation
For entities, use:
```java
@Schema(description = "Entity description")
@Schema(description = "Field description", example = "example value")
```

## Troubleshooting

### Common Issues

1. **Swagger UI not accessible**
   - Ensure the application is running
   - Check if port 8080 is available
   - Verify the context path configuration

2. **Missing endpoints**
   - Ensure controllers have proper annotations
   - Check if endpoints are properly mapped
   - Verify Spring Boot version compatibility

3. **CORS issues**
   - Check CORS configuration in `CorsConfig.java`
   - Ensure frontend origins are properly configured

## Next Steps

1. **Start the application** using your existing startup scripts
2. **Access Swagger UI** at http://localhost:8080/swagger-ui.html
3. **Explore the API documentation** and test endpoints
4. **Customize further** by adding more annotations to your controllers

## Additional Resources

- [SpringDoc OpenAPI Documentation](https://springdoc.org/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger Annotations Reference](https://github.com/swagger-api/swagger-core/wiki/Annotations)

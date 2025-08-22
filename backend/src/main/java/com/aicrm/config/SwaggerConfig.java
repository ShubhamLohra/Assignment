package com.aicrm.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("AI CRM API")
                        .description("Backend API for AI-enabled CRM system with lead management, deal tracking, and AI-powered insights")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("AI CRM Team")
                                .email("support@aicrm.com")
                                .url("https://aicrm.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Local Development Server"),
                        new Server().url("http://localhost:8080/api").description("API Base Path")
                ));
    }
}

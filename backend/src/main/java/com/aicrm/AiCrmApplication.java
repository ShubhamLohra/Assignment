package com.aicrm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Main Spring Boot Application class for AI-enabled CRM system
 */
@SpringBootApplication
@EnableAsync
@EnableScheduling
public class AiCrmApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(AiCrmApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(AiCrmApplication.class, args);
        System.out.println("🚀 AI CRM System is running!");
        System.out.println("📱 Backend API: http://localhost:8080/api");
        System.out.println("🔗 Health Check: http://localhost:8080/api/health");
    }
}

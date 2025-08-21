FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY .mvn/ .mvn/
COPY mvnw mvnw.cmd pom.xml ./

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Run the application
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "target/ai-crm-0.0.1-SNAPSHOT.jar"]

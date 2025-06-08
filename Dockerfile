FROM eclipse-temurin:24-jdk AS build

WORKDIR /app

COPY . .

RUN chmod +x ./mvnw && ./mvnw -B -DskipTests clean install

FROM eclipse-temurin:24-jdk

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]

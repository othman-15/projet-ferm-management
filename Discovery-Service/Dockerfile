
FROM  eclipse-temurin:17 AS builder
WORKDIR /opt/app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline
COPY ./src ./src
RUN ./mvnw clean package -DskipTests


FROM  eclipse-temurin:17 AS final

COPY --from=builder /opt/app/target/*.jar /opt/app/app.jar
VOLUME /tmp


ENTRYPOINT ["java","-jar", "/opt/app/app.jar"]

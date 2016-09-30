package com.kylyv;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;

@Service
public class ParserService {

    private JsonNode json;

    @Value(value = "classpath:sample.json")
    private Resource jsonResource;

    @PostConstruct
    void createJsonNode() throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        File file = jsonResource.getFile();
        json = mapper.readTree(file);

    }

    JsonNode findValue(String path, String element, String id) {

        String[] pathArray = path.split("\\.");
        JsonNode items = findItems(pathArray);

        if(items.isMissingNode() || !items.isArray()) {
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND);
        }

        JsonNode objectNode = findObjectWithId(items, id);
        JsonNode elementValue = objectNode.get(element);

        if(elementValue.isMissingNode()) {
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND);
        }

        return elementValue;
    }

    private JsonNode findObjectWithId(JsonNode items, String id) {

        for (JsonNode item: items) {
            if(item.has("id") && item.get("id").asText().equals(id)) {
                return item;
            }
        }

        throw new HttpClientErrorException(HttpStatus.NOT_FOUND);
    }

    private JsonNode findItems(String[] pathArray) {

        JsonNode node = json;
        for (String path : pathArray) {

            node = node.path(path);

            if (node.isMissingNode()) {
                return node;
            }

        }

        return node;
    }

}

package com.kylyv;

import com.fasterxml.jackson.databind.JsonNode;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class JsonDAOTest {

    @Autowired
    JsonDAO parserService;

    @Test
    public void findValueTest() {
        JsonNode node = parserService.getValue("itemList.items.subItems", "label", "subItem1Item2");

        assertThat(node.isValueNode());
        assertThat(node.asText()).isEqualTo("SubItem 2 label");
    }
}

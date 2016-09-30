package com.kylyv;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ParserServiceTest {

    @Autowired
    ParserService parserService;

    @Test
    public void findValueTest() {
        assertThat(parserService.findValue("foo", "bar", "baz")).isEqualTo("Hello");
    }
}

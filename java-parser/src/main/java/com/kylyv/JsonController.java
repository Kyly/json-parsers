package com.kylyv;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.websocket.server.PathParam;
import java.util.HashMap;
import java.util.Map;

@Controller
public class JsonController {

    @Autowired
    JsonDAO parserService;

    @RequestMapping(value = "json", method = RequestMethod.GET)
    @ResponseBody
    Map<String, JsonNode> getValue(@PathParam("path") String path, @PathParam("element") String element,
                                    @PathParam("id") String id) {

        Map<String, JsonNode> map = new HashMap<>();
        map.put("result", parserService.getValue(path, element, id));

        return map;
    }

}

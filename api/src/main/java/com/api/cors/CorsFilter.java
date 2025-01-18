package com.api.cors;

import com.api.config.property.ApiProperty;
import lombok.AllArgsConstructor;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@AllArgsConstructor
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilter implements Filter {
    private final ApiProperty apiProperty;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse resp = (HttpServletResponse) response;
        HttpServletRequest req = (HttpServletRequest) request;

        resp.setHeader("Access-Control-Allow-Origin", apiProperty.getOriginPermitida());
        resp.setHeader("Access-Control-Allow-Credentials", "true");

        if ("OPTIONS".equals(req.getMethod()) && apiProperty.getOriginPermitida().equals(req.getHeader("Origin"))) {
            resp.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS, PATCH");
            resp.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept");
            resp.setHeader("Access-Control-Max-Age", "3600");
            resp.setStatus(HttpServletResponse.SC_OK);
        } else {
            chain.doFilter(req, resp);
        }
    }

    @Override
    public void destroy() {
    }

    @Override
    public void init(FilterConfig filterConfig) {
    }
}

package com.kdt.landing.global.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Log4j2
@Configuration
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableWebSecurity
public class SecurityConfig {


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        log.info("-------------------  filter Chain  ------------------");


        http.csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests((authorizeRequests) -> {authorizeRequests.requestMatchers(new AntPathRequestMatcher("**")).permitAll();})
                .authorizeHttpRequests((authorizeRequests) -> {authorizeRequests.requestMatchers(new AntPathRequestMatcher("/")).permitAll();})
            .formLogin((formLogin) -> formLogin
                        .loginPage("/member/login")
                        .failureUrl("/member/login?error=true")
                        .loginProcessingUrl("/loginPro")
                        .defaultSuccessUrl("/")
                        .usernameParameter("email")
                        .passwordParameter("pw"))
            .logout((logout) -> logout.logoutUrl("/logout").logoutSuccessUrl("/"))
                .exceptionHandling((exceptionHandling) -> exceptionHandling.authenticationEntryPoint(new CustomAuthenticationEntryPoint()))
                .headers((headers) -> headers.addHeaderWriter(new XFrameOptionsHeaderWriter(XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN)));
        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer(){
        log.info("-------------------- WebSecurity ----------------------");
        return (web) -> web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }
}





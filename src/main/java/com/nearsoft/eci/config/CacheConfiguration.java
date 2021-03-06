package com.nearsoft.eci.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.nearsoft.eci.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.nearsoft.eci.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.nearsoft.eci.domain.User.class.getName());
            createCache(cm, com.nearsoft.eci.domain.Authority.class.getName());
            createCache(cm, com.nearsoft.eci.domain.User.class.getName() + ".authorities");
            createCache(cm, com.nearsoft.eci.domain.PersistentToken.class.getName());
            createCache(cm, com.nearsoft.eci.domain.User.class.getName() + ".persistentTokens");
            createCache(cm, com.nearsoft.eci.domain.Employee.class.getName());
            createCache(cm, com.nearsoft.eci.domain.Employee.class.getName() + ".keyDates");
            createCache(cm, com.nearsoft.eci.domain.Employee.class.getName() + ".nextOfKins");
            createCache(cm, com.nearsoft.eci.domain.Employee.class.getName() + ".assignments");
            createCache(cm, com.nearsoft.eci.domain.Employee.class.getName() + ".skills");
            createCache(cm, com.nearsoft.eci.domain.Employee.class.getName() + ".budgets");
            createCache(cm, com.nearsoft.eci.domain.ContactInfo.class.getName());
            createCache(cm, com.nearsoft.eci.domain.NextOfKin.class.getName());
            createCache(cm, com.nearsoft.eci.domain.Client.class.getName());
            createCache(cm, com.nearsoft.eci.domain.Client.class.getName() + ".clientProjects");
            createCache(cm, com.nearsoft.eci.domain.ClientProject.class.getName());
            createCache(cm, com.nearsoft.eci.domain.ClientProject.class.getName() + ".assignments");
            createCache(cm, com.nearsoft.eci.domain.EmployeeClientAssignment.class.getName());
            createCache(cm, com.nearsoft.eci.domain.Budget.class.getName());
            createCache(cm, com.nearsoft.eci.domain.Budget.class.getName() + ".assignments");
            createCache(cm, com.nearsoft.eci.domain.EmployeeBudgetAssignment.class.getName());
            createCache(cm, com.nearsoft.eci.domain.KeyDate.class.getName());
            createCache(cm, com.nearsoft.eci.domain.Skill.class.getName());
            createCache(cm, com.nearsoft.eci.domain.EmployeeSkill.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}

package com.ridefixxer.app.web.rest;

import com.ridefixxer.app.RideFixxerApp;

import com.ridefixxer.app.domain.BodyShop;
import com.ridefixxer.app.repository.BodyShopRepository;
import com.ridefixxer.app.service.BodyShopService;
import com.ridefixxer.app.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.ridefixxer.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BodyShopResource REST controller.
 *
 * @see BodyShopResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RideFixxerApp.class)
public class BodyShopResourceIntTest {

    private static final String DEFAULT_OWNER = "AAAAAAAAAA";
    private static final String UPDATED_OWNER = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private BodyShopRepository bodyShopRepository;
    
    @Autowired
    private BodyShopService bodyShopService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBodyShopMockMvc;

    private BodyShop bodyShop;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BodyShopResource bodyShopResource = new BodyShopResource(bodyShopService);
        this.restBodyShopMockMvc = MockMvcBuilders.standaloneSetup(bodyShopResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BodyShop createEntity(EntityManager em) {
        BodyShop bodyShop = new BodyShop()
            .owner(DEFAULT_OWNER)
            .name(DEFAULT_NAME)
            .phone(DEFAULT_PHONE)
            .email(DEFAULT_EMAIL);
        return bodyShop;
    }

    @Before
    public void initTest() {
        bodyShop = createEntity(em);
    }

    @Test
    @Transactional
    public void createBodyShop() throws Exception {
        int databaseSizeBeforeCreate = bodyShopRepository.findAll().size();

        // Create the BodyShop
        restBodyShopMockMvc.perform(post("/api/body-shops")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyShop)))
            .andExpect(status().isCreated());

        // Validate the BodyShop in the database
        List<BodyShop> bodyShopList = bodyShopRepository.findAll();
        assertThat(bodyShopList).hasSize(databaseSizeBeforeCreate + 1);
        BodyShop testBodyShop = bodyShopList.get(bodyShopList.size() - 1);
        assertThat(testBodyShop.getOwner()).isEqualTo(DEFAULT_OWNER);
        assertThat(testBodyShop.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBodyShop.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testBodyShop.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    public void createBodyShopWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bodyShopRepository.findAll().size();

        // Create the BodyShop with an existing ID
        bodyShop.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBodyShopMockMvc.perform(post("/api/body-shops")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyShop)))
            .andExpect(status().isBadRequest());

        // Validate the BodyShop in the database
        List<BodyShop> bodyShopList = bodyShopRepository.findAll();
        assertThat(bodyShopList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBodyShops() throws Exception {
        // Initialize the database
        bodyShopRepository.saveAndFlush(bodyShop);

        // Get all the bodyShopList
        restBodyShopMockMvc.perform(get("/api/body-shops?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bodyShop.getId().intValue())))
            .andExpect(jsonPath("$.[*].owner").value(hasItem(DEFAULT_OWNER.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }
    
    @Test
    @Transactional
    public void getBodyShop() throws Exception {
        // Initialize the database
        bodyShopRepository.saveAndFlush(bodyShop);

        // Get the bodyShop
        restBodyShopMockMvc.perform(get("/api/body-shops/{id}", bodyShop.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bodyShop.getId().intValue()))
            .andExpect(jsonPath("$.owner").value(DEFAULT_OWNER.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBodyShop() throws Exception {
        // Get the bodyShop
        restBodyShopMockMvc.perform(get("/api/body-shops/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBodyShop() throws Exception {
        // Initialize the database
        bodyShopService.save(bodyShop);

        int databaseSizeBeforeUpdate = bodyShopRepository.findAll().size();

        // Update the bodyShop
        BodyShop updatedBodyShop = bodyShopRepository.findById(bodyShop.getId()).get();
        // Disconnect from session so that the updates on updatedBodyShop are not directly saved in db
        em.detach(updatedBodyShop);
        updatedBodyShop
            .owner(UPDATED_OWNER)
            .name(UPDATED_NAME)
            .phone(UPDATED_PHONE)
            .email(UPDATED_EMAIL);

        restBodyShopMockMvc.perform(put("/api/body-shops")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBodyShop)))
            .andExpect(status().isOk());

        // Validate the BodyShop in the database
        List<BodyShop> bodyShopList = bodyShopRepository.findAll();
        assertThat(bodyShopList).hasSize(databaseSizeBeforeUpdate);
        BodyShop testBodyShop = bodyShopList.get(bodyShopList.size() - 1);
        assertThat(testBodyShop.getOwner()).isEqualTo(UPDATED_OWNER);
        assertThat(testBodyShop.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBodyShop.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testBodyShop.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingBodyShop() throws Exception {
        int databaseSizeBeforeUpdate = bodyShopRepository.findAll().size();

        // Create the BodyShop

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBodyShopMockMvc.perform(put("/api/body-shops")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bodyShop)))
            .andExpect(status().isBadRequest());

        // Validate the BodyShop in the database
        List<BodyShop> bodyShopList = bodyShopRepository.findAll();
        assertThat(bodyShopList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBodyShop() throws Exception {
        // Initialize the database
        bodyShopService.save(bodyShop);

        int databaseSizeBeforeDelete = bodyShopRepository.findAll().size();

        // Get the bodyShop
        restBodyShopMockMvc.perform(delete("/api/body-shops/{id}", bodyShop.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BodyShop> bodyShopList = bodyShopRepository.findAll();
        assertThat(bodyShopList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BodyShop.class);
        BodyShop bodyShop1 = new BodyShop();
        bodyShop1.setId(1L);
        BodyShop bodyShop2 = new BodyShop();
        bodyShop2.setId(bodyShop1.getId());
        assertThat(bodyShop1).isEqualTo(bodyShop2);
        bodyShop2.setId(2L);
        assertThat(bodyShop1).isNotEqualTo(bodyShop2);
        bodyShop1.setId(null);
        assertThat(bodyShop1).isNotEqualTo(bodyShop2);
    }
}

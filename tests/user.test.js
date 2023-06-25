const request = require("supertest");
const axios = require("axios");
const { createApp } = require("../app");
const appDataSource = require("../models/dataSource");
jest.mock("axios");

describe("kakao signin", () => {
  let app;
  let kakaoToken = "bi78FiN7EvP4_H8RRs2sPrIbnt46P92dvsUdIoZPCj102QAAAYj2bGzC";

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
  });

  afterAll(async () => {
    app = createApp();
    await appDataSource.query(`SET foreign_key_checks = 0`);
    await appDataSource.query(`TRUNCATE users`);
    await appDataSource.query(`SET foreign_key_checks = 0`);
    await appDataSource.destroy();
  });

  test("SUCCESS: kakao signin", async () => {
    axios.get = jest.fn().mockReturnValue({
      data: {
        id: 1351615615,
        connected_at: "2022-08-30T14:41:02Z",
        properties: {
          nickname: "위코딩",
          profile_image: "~~~",
          thumbnail_image: "!!!!",
        },
        kakao_account: {
          profile_nickname_needs_agreement: false,
          profile_image_needs_agreement: false,
          profile: [Object],
          has_email: true,
          email_needs_agreement: false,
          is_email_valid: true,
          is_email_verified: true,
          email: "unit@hanmail.net",
          has_age_range: true,
          age_range_needs_agreement: false,
          age_range: "30~39",
          has_gender: true,
          gender_needs_agreement: false,
          gender: "male",
        },
      },
      status: 200,
    });

    const res = await request(app)
      .post("/users/kakao/signin")
      .set("Authorization", `Bearer ${kakaoToken}`)
      .expect(200);

    expect(res.body).toHaveProperty("accessToken");
  });

  test("FAILED: kakaoToken not exist", async () => {
    axios.get = jest.fn().mockReturnValue({
      data: {
        id: 1351615615,
        connected_at: "2022-08-30T14:41:02Z",
        properties: {
          nickname: "위코딩",
          profile_image: "~~~",
          thumbnail_image: "!!!!",
        },
        kakao_account: {
          profile_nickname_needs_agreement: false,
          profile_image_needs_agreement: false,
          profile: [Object],
          has_email: true,
          email_needs_agreement: false,
          is_email_valid: true,
          is_email_verified: true,
          email: "unit@hanmail.net",
          has_age_range: true,
          age_range_needs_agreement: false,
          age_range: "30~39",
          has_gender: true,
          gender_needs_agreement: false,
          gender: "male",
        },
      },
    });

    return await request(app).post("/users/kakao/signin").expect(400);
  });
});

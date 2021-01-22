const { Router } = require('express');
const FormData = require('form-data');
const got = require('got');

const notification = Router();

notification.post('/', async (req, res) => {
  let event;

  try {
    event = JSON.parse(req.body);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 이벤트 수신 여부를 확인합니다.
  console.log(event);
  try {
    const form = new FormData();
    form.append(
      'from',
      `Zoom SDK from WebHook<mailgun@${process.env.MAIL_GUN_DOMAIN}>`,
    );
    form.append('to', 'mins5190@naver.com');
    form.append('subject', 'ZoomSDK 웹훅');
    form.append('template', 'zoom_web_hook');

    await got.post(
      `https://api.mailgun.net/v3/${process.env.MAIL_GUN_DOMAIN}/messages`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${process.env.MAIL_GUN_APIKEY}`,
          ).toString('base64')}`,
        },
        body: form,
      },
    );

    res.status(200).json({
      ok: true,
      error: null,
    });
  } catch (e) {
    res.status(e.response.status).json({
      ok: false,
      error: 'Error: 4000: Data is NotFound',
    });
  }
});

module.exports = notification;

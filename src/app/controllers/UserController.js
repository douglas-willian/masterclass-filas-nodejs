import mailQueue from '../lib/Queue';

export default {
  async store(req, res) {
    const { name, email, password } = req.body;
    const user = {
      name,
      email,
      password,
    };

    await mailQueue.add('RegistrationMail', { user });

    return res.send(user);
  },
};

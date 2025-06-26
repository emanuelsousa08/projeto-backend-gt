const User = require("../models/User");

class UserController {

  getUserById = async (req, res) => {
    try {
      const userId = req.params.id;

      const user = await User.findByPk(userId, {
        attributes: ["id", "firstname", "surname", "email"],
      });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Erro no servidor" });
    }
  };

  createUser = async (req, res) => {
    try {
      const { firstname, surname, email, password, confirmPassword } = req.body;

      // validação básica
      if (!firstname || !surname || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "Preencha todos os campos" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "As senhas não coincidem" });
      }

      // cria o usuário (o hash da senha já é tratado no model)
      const newUser = await User.create({
        firstname,
        surname,
        email,
        password,
      });

      return res.status(201).json({
        id: newUser.id,
        firstname: newUser.firstname,
        surname: newUser.surname,
        email: newUser.email,
      });
    } catch (error) {
      // erro de e-mail duplicado ou outros
      return res.status(400).json({ error: error.message });
    }
  };

  updateUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const { firstname, surname, email } = req.body;

      // validação básica
      if (!firstname || !surname || !email) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios" });
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // atualiza os dados
      await user.update({ firstname, surname, email });

      return res.status(204).send(); // sem corpo
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      await user.destroy();

      return res.status(204).send(); // sucesso, sem conteúdo
    } catch (error) {
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  };
}

module.exports = UserController;

// exports.getUserById = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     const user = await User.findByPk(userId, {
//       attributes: ['id', 'firstname', 'surname', 'email'],
//     });

//     if (!user) {
//       return res.status(404).json({ message: 'Usuário não encontrado' });
//     }

//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(500).json({ error: 'Erro no servidor' });
//   }
// };

// exports.createUser = async (req, res) => {
//   try {
//     const { firstname, surname, email, password, confirmPassword } = req.body;

//     // validação básica
//     if (!firstname || !surname || !email || !password || !confirmPassword) {
//       return res.status(400).json({ message: 'Preencha todos os campos' });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'As senhas não coincidem' });
//     }

//     // cria o usuário (o hash da senha já é tratado no model)
//     const newUser = await User.create({ firstname, surname, email, password });

//     return res.status(201).json({
//       id: newUser.id,
//       firstname: newUser.firstname,
//       surname: newUser.surname,
//       email: newUser.email,
//     });
//   } catch (error) {
//     // erro de e-mail duplicado ou outros
//     return res.status(400).json({ error: error.message });
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const { firstname, surname, email } = req.body;

//     // validação básica
//     if (!firstname || !surname || !email) {
//       return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
//     }

//     const user = await User.findByPk(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'Usuário não encontrado' });
//     }

//     // atualiza os dados
//     await user.update({ firstname, surname, email });

//     return res.status(204).send(); // sem corpo
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     const user = await User.findByPk(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'Usuário não encontrado' });
//     }

//     await user.destroy();

//     return res.status(204).send(); // sucesso, sem conteúdo
//   } catch (error) {
//     return res.status(500).json({ error: 'Erro interno do servidor' });
//   }
// };

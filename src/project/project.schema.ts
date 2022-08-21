import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
  owner: { type: String, require: true },
  titulo: { type: String, require: true },
  descripcion: { type: String, require: true },
  puedenVer: [{ type: String, require: true }],
  color: { type: String, require: true },
});

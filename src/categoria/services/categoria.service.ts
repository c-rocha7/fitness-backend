import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from '../entities/categoria.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: {
        id,
      },
    });

    if (!categoria)
      throw new HttpException(
        'Categoria não encontrado!',
        HttpStatus.NOT_FOUND,
      );

    return categoria;
  }

  async create(categoria: Categoria): Promise<Categoria> {
    return this.categoriaRepository.save(categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    await this.findById(categoria.id);

    return await this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.categoriaRepository.delete(id);
  }
}

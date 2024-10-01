import express from 'express';
import type { Request, Response } from 'express';
import { Volunteer } from '../../models/index.js';

const router = express.Router();

// GET /volunteers - Get all volunteers
router.get('/', async (_req: Request, res: Response) => {
  try {
    const volunteers = await Volunteer.findAll();
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving volunteers' });
  }
});

// GET /volunteers/:id - Get a volunteer by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const volunteer = await Volunteer.findByPk(req.params.id);
    if (volunteer) {
      res.json(volunteer);
    } else {
      res.status(404).json({ error: 'Volunteer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving volunteer' });
  }
});

// POST /volunteers - Create a new volunteer
router.post('/', async (req: Request, res: Response) => {
  try {
    const volunteer = await Volunteer.create(req.body);
    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ error: 'Error creating volunteer' });
  }
});

// PUT /volunteers/:id - Update a volunteer by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const volunteer = await Volunteer.findByPk(req.params.id);
    if (volunteer) {
      await volunteer.update(req.body);
      res.json(volunteer);
    } else {
      res.status(404).json({ error: 'Volunteer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating volunteer' });
  }
});

// DELETE /volunteers/:id - Delete a volunteer by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const volunteer = await Volunteer.findByPk(req.params.id);
    if (volunteer) {
      await volunteer.destroy();
      res.json({ message: 'Volunteer deleted' });
    } else {
      res.status(404).json({ error: 'Volunteer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting volunteer' });
  }
});

export { router as volunteerRouter };

import express from 'express';
import type { Request, Response } from 'express';
import { Work, Volunteer } from '../../models/index.js';


 const router = express.Router();

//  GET /works - Get all Works
router.get('/', async (_req: Request, res: Response) => {
  try {
    const works = await Work.findAll();
    res.json(works);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving works' });
  }
});

// GET /works/:id - Get work by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const work = await Work.findByPk(req.params.id);
    if (work) {
      res.json(work);
    } else {
      res.status(404).json({ error: 'Work not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving work' });
  }
});

// POST /works - Create new work
router.post('/', async (req: Request, res: Response) => {
  try {
    const volunteer = await Volunteer.findByPk(req.body.assignedVolunteerId);
    if (!volunteer) {
      res.status(400).json({ error: 'Volunteer not found' });
      return;
    }

    const work = await Work.create(req.body);
    res.json(work);
  } catch (error) {
    res.status(500).json({ error: 'Error creating work' });
  }
});

// PUT /works/:id - Update work by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const work = await Work.findByPk(req.params.id);
    if (work) {
      await work.update(req.body);
      res.json(work);
    } else {
      res.status(404).json({ error: 'Work not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating work' });
  }
});

// DELETE /works/:id - Delete work by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const work = await Work.findByPk(req.params.id);
    if (work) {
      await work.destroy();
      res.json({ message: 'Work deleted' });
    } else {
      res.status(404).json({ error: 'Work not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting work' });
  }
});

export { router as workRouter };

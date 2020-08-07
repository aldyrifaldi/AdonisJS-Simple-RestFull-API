'use strict'


const Hotel = use('App/Models/Hotel')
const { validate } = use('Validator')

class HotelController {


  async index ({ request, response }) {
    const result = await Hotel.all()
    const restData = {
      message: 'Hotel has been listed successfully',
      data: result
    }

    return response.status(200).json(restData)
  }


  async store ({ request, response }) {
    const req = request.all()

    // rules validator
    const rules = {
      name: 'required',
      address: 'required'
    }

    const validation = await validate(req,rules)

    // check if request body validation
    if (validation.fails()) return response.status(400).json({
      message: validation.messages()[0].message
    })

    const hotel = new Hotel()
    hotel.name = req.name
    hotel.address = req.address
    await hotel.save()
    const restData = {
      message: 'Hotel has been created successfully',
      data: hotel
    }

    return response.status(201).json(restData)
  }

  async show ({ params, request, response }) {
    const hotel = await Hotel.find(params.id)
    const restData = {
      message: 'Hotel has been fetched successfully.',
      data: hotel
    }

    return response.status(200).json(restData)
  }


  async update ({ params, request, response }) {
    const req = request.all()
    const hotel = await Hotel.find(params.id)

    // rules validation
    const rules = {
      name: 'required',
      address: 'required',
    }

    const validation = await validate(req,rules)

    // check if request body validation
    if (validation.fails()) return response.status(400).json({
      message: validation.messages()[0].message
    })

    // Check if params.id not found
    if (!hotel) return response.status(200).json({
      message: 'Hotel with id ${params.id} is not found or has not been created',
      data: {}
    })

    hotel.name = req.name
    hotel.address = req.address
    await hotel.save()

    const restData = {
      message: 'Hotel has been fetched successfully',
      data: hotel
    }

    return response.status(200).json(restData)
  }


  async destroy ({ params, request, response }) {
    const hotel = await Hotel.find(params.id)
    if (!hotel) return response.status(200).json({
      message: 'Hotel with id ${params.id} is not found or has not been created',
      data: {}
    })

    await hotel.delete()
    const restData = {
      message: 'Hotel with id ${params.id} has been deleted successfully',
      data: hotel,
    }
    return response.status(200).json(restData)
  }
}

module.exports = HotelController

import { FileUtils, S3Helper } from "../../src";
import * as assert from "assert";

describe(__filename, () => {

  test('should generate csv from string when data is not an array', () => {
    const csv = `name,lastname\ndata.name,data.lastname`
    const input = {
      data: {
        name: 'Juan',
        lastname: 'Perez'
      }
    }

    const output = FileUtils.generateCSV(csv, input)
    assert.strictEqual(output, 'name,lastname\nJuan,Perez')
  })

  test('should generate csv from string when data is an array', () => {
    const csv = `name,lastname\ndata.name,data.lastname`
    const input = [
      {
        data: {
          name: 'Juan1',
          lastname: 'Perez1'
        }
      },
      {
        data: {
          name: 'Juan2',
          lastname: 'Perez2'
        }
      },
      {
        data: {
          name: 'Juan3',
          lastname: 'Perez3'
        }
      }
    ]

    const output = FileUtils.generateCSV(csv, input)
    assert.strictEqual(output, 'name,lastname\nJuan1,Perez1\nJuan2,Perez2\nJuan3,Perez3')
  })

  test('should generate csv from string when data is an array and attributes are null', () => {
    const csv = `name,lastname\ndata.name,data.lastname`
    const input = [
      {
        data: {
          name: 'Juan1',
          lastname: 'Perez1'
        }
      },
      {
        data: {
          lastname: 'Perez2'
        }
      },
      {
        data: {
          name: 'Juan3',
          lastname: 'Perez3'
        }
      }
    ]

    const output = FileUtils.generateCSV(csv, input)
    assert.strictEqual(output, 'name,lastname\nJuan1,Perez1\n,Perez2\nJuan3,Perez3')
  })

  test('should generate csv from mongodb document successfully', () => {
    const legajo = {
      "_id": "651c1da9e59bd5006d415d2e",
      "authentication": {
        "email": {
          "validated": false
        }
      },
      "activity": false,
      "hidden": false,
      "firstname": "Lucía miranda",
      "lastname": "Cappelletti gomez",
      "name": "Lucía miranda Cappelletti gomez",
      "nameSanitized": "Lucia miranda Cappelletti gomez",
      "gender": "Femenino",
      "userIp": "181.44.129.9",
      "userId": "6512e4fa4e0c1a0025b4d41e",
      "tenantId": "6459410215d2be00125d76e0",
      "email": "Lumicap@hotmail.com",
      "idNumber": "40378712",
      "idNumberCountry": "AR",
      "dev": false,
      "source": null,
      "utms": "",
      "mobilePhone": "+541141786692",
      "status": "Nuevo",
      "customInputs": [
        {
          "name": "Fecha de Nacimiento",
          "value": "18/04/1997"
        }
      ],
      "data": {
        "birthdate": "18/04/1997"
      },
      "lastActivityAt": "2023-10-03T14:03:39.087Z",
      "referenceCode": "nw8qXytbizO-",
      "notes": [],
      "createdAt": "2023-10-03T13:56:57.879Z",
      "updatedAt": "2023-10-03T14:03:59.122Z",
      "__v": 0,
      "applicantParent": "",
      "linkApplicant": "https://quieromimasteritau.tuonboarding.com?applicant=651c1da9e59bd5006d415d2e",
      "linkRecover": "https://quieromimasteritau.tuonboarding.com?recover=651c1da9e59bd5006d415d2e&utm_recovery=true",
      "shortId": "KQlgJ1gRrmuGtMhp",
      "completenessLegajo": 1,
      "simulationProduct": "A",
      "statusScoring": 1,
      "thirdParty": {
        "decisionrules": {
          "result": {
            "code": "Directo",
            "nextStep": "approved",
            "limite": 50,
            "scoring_type": "Directo"
          },
          "status": "Directo",
          "input": {
            "tenantId": "6459410215d2be00125d76e0",
            "configurationId": "qZaZCc9Hk",
            "dev": false,
            "workflow": "score",
            "action": "decisionrules",
            "customer_info": {
              "identification_number": "40378712",
              "name": "Lucía miranda",
              "surname": "Cappelletti gomez",
              "email": "Lumicap@hotmail.com",
              "telephone_number": "+541141786692",
              "gender": "F"
            },
            "additional_info": {
              "idNumber": "40378712"
            }
          }
        },
        "ftp_migrated": true
      },
      "typeScoring": "Directo",
      "totalComplete": 100,
      "products": {
        "tarjeta_itau_mastercard_chat": {
          "dates": {
            "selected": "Tue Oct 03 2023 13:57:13 GMT+0000 (Coordinated Universal Time)",
            "accepted": "Tue Oct 03 2023 14:00:40 GMT+0000 (Coordinated Universal Time)"
          },
          "status": "accepted",
          "title": "Mastercard Cuenta Chat",
          "documents": [
            "Formulario2067",
            "Contrato"
          ],
          "additional_products": {}
        }
      },
      "information": {
        "datosbasicos": {
          "tipoFiscal": {
            "answer": "CUIL",
            "question": "CUIL/CUIT/CDI"
          },
          "cuilCuit": {
            "answer": {
              "country": "AR",
              "value": "23403787124"
            },
            "question": "Compartinos tu nro. de identificación  fiscal"
          },
          "paisNacimiento": {
            "answer": "Argentina",
            "question": "¿Cuál es tu país de nacimiento?"
          },
          "nacionalidad": {
            "answer": "Argentina",
            "question": "¿Tu nacionalidad es?"
          },
          "residencia": {
            "answer": "Permanente",
            "question": "¿Tu residencia es temporal o permanente?",
            "value": "Permanente"
          },
          "residenciaJurisdiccion": {
            "answer": "No",
            "question": "¿Posee residencia a efectos fiscales en una o más jurisdicciones distintas de Argentina?",
            "value": "No"
          }
        },
        "domicilio": {
          "calleDir": {
            "answer": "Saavedra ",
            "question": "Calle"
          },
          "numeroDir": {
            "answer": "477",
            "question": "Número"
          },
          "pisoDir": {
            "answer": "",
            "question": "Piso"
          },
          "deptoDir": {
            "answer": "",
            "question": "Departamento"
          },
          "codPostalDir": {
            "answer": "1704",
            "question": "Código Postal"
          },
          "localidadDir": {
            "answer": "Ramos Mejía ",
            "question": "Localidad"
          },
          "provinciaDir": {
            "answer": "Buenos Aires ",
            "question": "Provincia"
          },
          "entreCallesDir": {
            "answer": "Avellaneda y necochea ",
            "question": "Entre Calles"
          }
        },
        "domicilio-entrega": {
          "domIgual": {
            "answer": "Si",
            "question": "El domicilio de entrega es el mismo de antes?"
          }
        },
        "datosfamiliares": {
          "estadoCivil": {
            "answer": "Soltero/a",
            "question": "¿Cuál es tu estado civil?"
          }
        },
        "datoslaborales": {
          "actividadPrincipal": {
            "answer": "Independiente",
            "question": "¿Cuál es tu actividad principal?"
          },
          "profesion": {
            "answer": "Cosmetologa",
            "question": "Profesión"
          },
          "ingresoMensual": {
            "answer": "100000",
            "question": "Ingresos netos mensuales "
          }
        },
        "ingresosbrutos": {
          "condicionGanancias": {
            "answer": "Monotributo",
            "question": "¿Cual es tu condición frente al Impuesto a las Ganancias?"
          },
          "condicionIva": {
            "answer": "Consumidor Final",
            "question": "¿Cual es tu condición frente al IVA?"
          },
          "x0BHGWAVA": {
            "answer": "Consumidor Final",
            "question": "¿Cuál es tu condición frente a Ingresos Brutos?"
          }
        },
        "legales": {
          "actividadTitular": {
            "answer": "No",
            "question": "¿Algún titular de la cuenta realiza alguna de las actividades detalladas a continuación?",
            "value": "No"
          },
          "tipoActividad": {
            "answer": "",
            "question": "En caso de afirmativo, indicar cuales:"
          },
          "ppeRespuesta": {
            "answer": "No",
            "question": "¿Es usted una persona políticamente expuesta?",
            "value": "No"
          },
          "sujObl": {
            "answer": "No",
            "question": "¿Es usted Sujeto Obligado?",
            "value": "No"
          }
        }
      },
      "completenessLegajoText": "COMPLETO",
      "whatsapp": ""
    }
    const csv = `DNI,nombre_apellido,fecha de nacimiento,cuil_cuit_cdi,sexoMF,estado_civil,mail,Telefono,nacionalidad,pais_nacimiento,calle,altura_Calle,piso,dpto,codigo_postal,provincia,localidad,actividad_principal,empresa,PEP,Sujeto Obligado,Limite\nidNumber,name,data.birthdate,information.datosbasicos.cuilCuit.answer.value,SEXO??,information.datosfamiliares.estadoCivil.answer,email,mobilePhone,information.datosbasicos.nacionalidad.answer,information.datosbasicos.paisNacimiento.answer,information.domicilio.calleDir.answer,information.domicilio.numeroDir.answer,information.domicilio.pisoDir.answer,information.domicilio.deptoDir.answer,information.domicilio.codPostalDir.answer,information.domicilio.provinciaDir.answer,information.domicilio.localidadDir.answer,information.datoslaborales.actividadPrincipal.answer,EMPRESA,information.legales.ppeRespuesta.answer,information.legales.sujObl.answer,information.datoslaborales.ingresoMensual.answer`

    const output = FileUtils.generateCSV(csv, legajo)
    console.log(output)
  })
})

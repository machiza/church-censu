'use client'

import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import TextinputFloat from "@/components/ui/Textinput-float";
import Flatpickr from "react-flatpickr";
import FloatingLabelFlatpickr from "@/components/partials/FloatingLabelFlatpickr";
import SelectFloat from "@/components/ui/SelectFloat";
import InputGroup from "@/components/ui/InputGroup";
import Textarea from "@/components/ui/Textarea";
import Checkbox from "@/components/ui/Checkbox";
import Radio from "@/components/ui/Radio";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Camera, CameraResultType } from '@capacitor/camera';

const options = [
  {
    value: "male",
    label: "Masculino",
  },
  {
    value: "famale",
    label: "Femenino",
  },
];

const catechesisStageOptions = [
  {
    value: 1,
    label: "1ᵒ Fase",
  },
  {
    value: 2,
    label: "2ᵒ Fase",
  },
  {
    value: 3,
    label: "3ᵒ Fase",
  },
  {
    value: 4,
    label: "4ᵒ Fase",
  },
];

const steps = [
  {
    id: 1,
    title: "Account Details",
  },
  {
    id: 2,
    title: "Personal info-500",
  },
  {
    id: 3,
    title: "Address",
  },
  {
    id: 4,
    title: "Social Links",
  },
];

let stepSchema = yup.object().shape({
  lastName: yup.string().required(" Last name is required"),
  fullname: yup.string().required("Full name is required"),
  birthdate: yup.date().required('Date is required').nullable(),
  genre: yup.string().required("Genre is required"),
  neighbourhood: yup.string().required(" Neighbourhood is required"),
  block: yup.string().nullable(),
  houseNumber: yup.string().nullable(),
  street: yup.string().nullable(),
  //.matches(/^[0-9]{12}$/, "Phone number is not valid"),
});

let personalSchema = yup.object().shape({
  fatherName: yup.string().required(" Father name is required"),
  motherName: yup.string().required(" Mother name is required"),
  guardianName: yup.string().required(" Guardian name is required"),
  guardianTelephone: yup.string().required(" Guardian telephone is required"),
});
let addressSchema = yup.object().shape({
  christening: yup.string().nullable(),
  chrismated: yup.string().nullable(),
  catechesisStage: yup.string().nullable(),
  catechesis: yup.string().nullable(),
  school: yup.string().nullable(),
  schoolLevel: yup.string().nullable(),
  observations: yup.string().nullable(),
});
const url =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

let socialSchema = yup.object().shape({
  observations: yup.string().nullable(),
});
const FormWizard = () => {
  const [stepNumber, setStepNumber] = useState(0);

  // find current step schema
  let currentStepSchema;
  switch (stepNumber) {
    case 0:
      currentStepSchema = stepSchema;
      break;
    case 1:
      currentStepSchema = personalSchema;
      break;
    case 2:
      currentStepSchema = addressSchema;
      break;
    case 3:
      currentStepSchema = socialSchema;
      break;
    default:
      currentStepSchema = stepSchema;
  }
  useEffect(() => {
    //console.log("step number changed");
  }, [stepNumber]);

  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(currentStepSchema),
    // keep watch on all fields
    mode: "all",
  });

  const onSubmit = (data: any) => {
    console.log({data});
    
    // next step until last step . if last step then submit form
    let totalSteps = steps.length;
    const isLastStep = stepNumber === totalSteps - 1;
    if (isLastStep) {
      console.log(data);
    } else {
      setStepNumber(stepNumber + 1);
    }
  };

  React.useEffect(() => {
    register('birthdate');
  }, [register]);

  const handlePrev = () => {
    setStepNumber(stepNumber - 1);
  };

  const [picker4, setPicker4] = useState(null);
  const [date, setDate] = useState(null);
  const [selectOption, setSelectOption] = useState("Orange");

  const handleOption = (e: any) => {
    setSelectOption(e.target.value);
    switch (e.target.value) {
      case 'father':
        setValue('guardianName', getValues('fatherName'));
        break;
      case 'mother':
        setValue('guardianName', getValues('motherName'));
        break;
    
      default:
        setValue('guardianName', getValues(''));
        break;
    }
  };

  const guardianOptions = [
    {
      value: "father",
      label: "Pai",
    },
    {
      value: "mother",
      label: "Mãe",
    },
    {
      value: "another",
      label: "Outro",
    },
  ];

  const [christening, setChristening] = useState(false);
  const [chrismated, setChrismated] = useState(false);
  const [catechesis, setCatechesis] = useState(false);
  const [photo, setPhoto] = useState("/assets/images/avatar/man.png")
  const [study, setStudy] = useState("YES");

  const handleChangeStudy = (e: any) => {
    setStudy(e.target.value);
  };

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
  
    // Can be set to the src of an image now
    // imageElement.src = imageUrl;
    setPhoto(`${imageUrl}`);
  };

  return (
    <div>
      <Card title="">
        <div>
          <div className="flex z-[5] items-center relative justify-center md:mx-8">
            {steps.map((item, i) => (
              <div
                className="relative z-[1] items-center item flex flex-start flex-1 last:flex-none group"
                key={i}
              >
                <div
                  className={`${
                    stepNumber >= i
                      ? "bg-slate-900 text-white ring-slate-900 ring-offset-2 dark:ring-offset-slate-500 dark:bg-slate-900 dark:ring-slate-900"
                      : "bg-white ring-slate-900 ring-opacity-70  text-slate-900 dark:text-slate-300 dark:bg-slate-600 dark:ring-slate-600 text-opacity-70"
                  }  transition duration-150 icon-box md:h-12 md:w-12 h-7 w-7 rounded-full flex flex-col items-center justify-center relative z-[66] ring-1 md:text-lg text-base font-medium`}
                >
                  {stepNumber <= i ? (
                    <span> {i + 1}</span>
                  ) : (
                    <span className="text-3xl">
                      <Icon icon="bx:check-double" />
                    </span>
                  )}
                </div>

                <div
                  className={`${
                    stepNumber >= i
                      ? "bg-slate-900 dark:bg-slate-900"
                      : "bg-[#E0EAFF] dark:bg-slate-700"
                  } absolute top-1/2 h-[2px] w-full`}
                ></div>
                <div
                  className={` ${
                    stepNumber >= i
                      ? " text-slate-900 dark:text-slate-300"
                      : "text-slate-500 dark:text-slate-300 dark:text-opacity-40"
                  } absolute top-full text-base md:leading-6 mt-3 transition duration-150 md:opacity-100 opacity-0 group-hover:opacity-100`}
                >
                  <span className="w-max">{item.title}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="conten-box ">
            <form onSubmit={handleSubmit(onSubmit)}>
              {stepNumber === 0 && (
                <div>
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 pt-10">
                    <div className="lg:col-span-3 md:col-span-2 col-span-1">
                      <h4 className="text-base text-slate-800 dark:text-slate-300 my-6">
                        Enter Your Account Details
                      </h4>
                    </div>
                    <TextinputFloat
                      id="lastName"
                      label="Apelido"
                      type="text"
                      placeholder="Apelido"
                      name="lastName"
                      error={errors.lastName}
                      register={register}
                    />
                    <TextinputFloat
                      id="fullname"
                      label="Nome Completo"
                      type="text"
                      placeholder="Nome completo"
                      name="fullname"
                      error={errors.fullname}
                      register={register}
                    />
                    <FloatingLabelFlatpickr
                      id="birthdate"
                      name="birthdate"
                      label="Data de Nascimento"
                      className="peer py-2 placeholder:text-slate-50 w-full block focus:outline-none h-[40px] peer focus:placeholder:text-slate-400"
                      value={picker4}
                      onChange={([date]: any) => {
                        setValue('birthdate', date);
                        setPicker4(date);
                        errors.birthdate = undefined;
                      }}
                      options={{
                        dateFormat: "Y-m-d",
                        disable: [
                          {
                            from: new Date(),
                            // eslint-disable-next-line no-mixed-operators
                            to: new Date(new Date().getTime() + 120 * 60 * 60 * 1000),
                          },
                        ],
                      }}
                      errors={errors}
                    />
                    
                    <SelectFloat
                      id="genre"
                      name="genre"
                      label="Selecione Sexo"
                      placeholder="Selecione Sexo"
                      options={options}
                      error={errors.genre}
                      register={register}
                    />

                    <TextinputFloat
                      label="Bairro"
                      type="text"
                      placeholder="Bairro"
                      name="neighbourhood"
                      error={errors.neighbourhood}
                      register={register}
                    />
                    <TextinputFloat
                      label="Quarteirão nᵒ"
                      type="number"
                      placeholder="Quarteirão nᵒ"
                      name="block"
                      error={errors.block}
                      register={register}
                    />
                    <TextinputFloat
                      label="Casa nᵒ"
                      type="number"
                      placeholder="Casa nᵒ"
                      name="houseNumber"
                      error={errors.houseNumber}
                      register={register}
                    />
                    <TextinputFloat
                      label="Rua"
                      type="text"
                      placeholder="Rua"
                      name="street"
                      error={errors.street}
                      register={register}
                    />
                    
                  </div>
                </div>
              )}

              {stepNumber === 1 && (
                <div>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                    <div className="md:col-span-2 col-span-1 mt-8">
                      <h4 className="text-base text-slate-800 dark:text-slate-300 my-6">
                        Enter Your Personal info-500
                      </h4>
                    </div>
                    <TextinputFloat
                      label="Father name"
                      type="text"
                      placeholder="Father name"
                      id="fatherName"
                      name="fatherName"
                      error={errors.fatherName}
                      register={register}
                    />
                    <TextinputFloat
                      label="Mother name"
                      type="text"
                      placeholder="Mother name"
                      id="motherName"
                      name="motherName"
                      error={errors.motherName}
                      register={register}
                    />
                    <div>Encarregado de educação</div>
                    <div className="flex flex-wrap space-xy-5">
                      {guardianOptions.map((option, j) => (
                        <Radio
                          key={`s-${j}`}
                          label={option.label}
                          name="guardianOption"
                          value={option.value}
                          checked={selectOption === option.value}
                          onChange={handleOption}
                        />
                      ))}
                    </div>
                    {selectOption === 'another' && <TextinputFloat
                      label="Nome do encarregado de educação"
                      type="text"
                      placeholder="Nome do encarregado de educação"
                      id="guardianName"
                      name="guardianName"
                      error={errors.guardianName}
                      register={register}
                    />}
                    <TextinputFloat
                      label="Contacto do encarregado de educação"
                      type="text"
                      placeholder="Contacto do encarregado de educação"
                      id="guardianTelephone"
                      name="guardianTelephone"
                      error={errors.guardianTelephone}
                      register={register}
                    />
                  </div>
                </div>
              )}
              {stepNumber === 2 && (
                <div>
                  <div className="grid grid-cols-1 gap-5">
                    <div className="mt-8">
                      <h4 className="text-base text-slate-800 dark:text-slate-300 my-6">
                        Residência
                      </h4>
                    </div>
                    <div className="flex flex-wrap space-x-5">
                    <Checkbox
                      label="Batizado"
                      value={christening}
                      onChange={() => setChristening(!christening)}
                    />
                    <Checkbox
                      label="Crismado"
                      value={chrismated}
                      onChange={() => setChrismated(!chrismated)}
                    />
                    <Checkbox
                      label="Catequese"
                      disabled={chrismated}
                      value={catechesis}
                      onChange={() => setCatechesis(!catechesis)}
                    />
                    </div>
                    {catechesis && <SelectFloat
                      id="catechesisStage"
                      name="catechesisStage"
                      label="Fase da catequese"
                      placeholder="Fase da catequese"
                      options={catechesisStageOptions}
                      error={errors.catechesisStage}
                      register={register}
                    />}
                    <div className="flex flex-wrap space-xy-5">
                    <div>Estuda: </div>
                    <Radio
                      label="Sim"
                      name="x"
                      value="YES"
                      checked={study === "YES"}
                      onChange={handleChangeStudy}
                    />
                    <Radio
                      label="Não"
                      name="x"
                      value="NO"
                      checked={study === "NO"}
                      onChange={handleChangeStudy}
                    />
                    </div>
                    {study === 'YES' && <TextinputFloat
                      label="Nome da Escola"
                      type="text"
                      placeholder="Nome da Escola"
                      id="school"
                      name="school"
                      error={errors.school}
                      register={register}
                    />}
                    {study === 'YES' && <TextinputFloat
                      label="Classe"
                      type="number"
                      placeholder="Classe"
                      name="schoolLevel"
                      error={errors.schoolLevel}
                      register={register}
                    />}
                    <Textarea
                      label="Observações"
                      type="text"
                      placeholder="Observações"
                      name="observations"
                      error={errors.observations}
                      register={register}
                    />
                  </div>
                </div>
              )}
              {stepNumber === 3 && (
                <div>
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                    <div className="lg:col-span-3 md:col-span-2 col-span-1 mt-8">
                      {/* <h4 className="text-base text-slate-800 dark:text-slate-300 my-6">
                        Enter Your Address
                      </h4> */}
                    </div>
                    <div className="flex-none">
                      <div className="md:h-[200px] md:w-[200px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                        <img
                          src={photo}
                          alt=""
                          className="w-full h-full object-cover rounded-full"
                        />
                        <div
                          onClick={takePicture} 
                          className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
                        >
                          <Icon icon="heroicons:pencil-square" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div
                className={`${
                  stepNumber > 0 ? "flex justify-between" : " text-right"
                } mt-10`}
              >
                {stepNumber !== 0 && (
                  <Button
                    text="prev"
                    className="btn-dark"
                    onClick={handlePrev}
                  />
                )}
                <Button
                  text={stepNumber !== steps.length - 1 ? "next" : "submit"}
                  className="btn-dark"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FormWizard;

import axios from "axios";

const SERVER_URL = "http://localhost:5000/";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}api/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    const { _id, ...productWithoutId } = productData;
    const response = await axios.post(
      `${SERVER_URL}api/products`,
      productWithoutId
    );
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const createNewProduct = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}api/products/new`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error create product:", error);
    throw error;
  }
};

export const updateProduct = async (id, newProduct) => {
  try {
    const response = await axios.patch(
      `${SERVER_URL}api/products/${id}`,
      newProduct
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${SERVER_URL}api/products/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(
      `מחיקת המוצר נכשלה: ${error.response?.data?.message || error.message}`
    );
  }
};

export const getValidationErrorMessage = (error) => {
  const dic = {
    productName: {
      en: {
        required: "Path `productName` is required.",
        maxLength: "Path `productName` exceeds maximum length of {max}.",
      },
      he: {
        required: "השדה 'שם מוצר' הוא שדה חובה.",
        maxLength: "השדה 'שם מוצר' חורג מהמגבלה של {max} תווים.",
      },
    },
    productSerialNumber: {
      en: {
        required: "Path `productSerialNumber` is required.",
        unique: "The serial number must be unique.",
        notNumber: "The serial number must be a number.",
        min: "The serial number must be greater than or equal to 0.",
      },
      he: {
        required: "השדה 'מקט' הוא שדה חובה.",
        unique: "מקט חייב להיות ייחודי.",
        notNumber: "מקט חייב להיות מספר.",
        min: " מקט חייב להיות גדול או שווה ל - 0",
      },
    },
    productDescription: {
      en: "Path `productDescription` is not valid.",
      he: "השדה 'תיאור מוצר' אינו תקין.",
    },
    productType: {
      en: "Path `productType` is not valid.",
      he: "השדה 'סוג מוצר' אינו תקין.",
    },
    unique: {
      en: "Duplicate value found for field '{field}'.",
      he: "ערך כפול נמצא בשדה '{field}'.",
    },
  };

  if (error.response && error.response.status === 400) {
    const validationErrors = error.response.data.errors || {};
    const errorMessages = Object.values(validationErrors).map((err) => {
      const field = err.path;
      const message = dic[field];

      if (message) {
        if (err.kind === "required") {
          return message.he.required;
        } else if (err.kind === "maxlength") {
          return message.he.maxLength.replace(
            "{max}",
            err.properties.maxlength
          );
        } else if (err.kind === "unique") {
          return message.he.unique;
        } else if (err.kind === "min") {
          return message.he.min;
        } else if (err.kind === "Number") {
          return message.he.notNumber;
        } else {
          return "שגיאה לא ידועה.";
        }
      }
      return { he: "שגיאה לא ידועה." };
    });

    const mergedMessages = errorMessages.reduce((acc, curr) => {
      acc.push(curr);
      return acc;
    }, []);

    return {
      en: "Validation errors occurred.",
      he: mergedMessages.join(", "),
    };
  }

  return { en: "Unknown error occurred.", he: "שגיאה לא ידועה." };
};

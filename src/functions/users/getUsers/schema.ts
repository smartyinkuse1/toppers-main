export default {
  type: "object",
  properties: {
    queryStringParameters: {
      type: "object",
      properties: {
        userName: {type: ['string', 'null'] },
        firstName: {type: ['string', 'null']}
      },
      additionalProperties: false
      
    },
  },
} as const;

// export default {
//   type: "object",
//   properties: {
//     userName: { type: 'string' }
//   },
//   required: ['userName']
// } as const;

const CU_TOKEN = "pk_99903739_YHD60HEDVI349Z1TJLA9OF6V93UP8SPF";
const CU_LIST  = "2ky44qvf-3713";

exports.handler = async function(event, context) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  if(event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const page = event.queryStringParameters?.page || 0;
    const url = `https://api.clickup.com/api/v2/list/${CU_LIST}/task?subtasks=true&include_closed=false&page=${page}`;
    
    const response = await fetch(url, {
      headers: { "Authorization": CU_TOKEN }
    });

    const data = await response.json();
    return { statusCode: 200, headers, body: JSON.stringify(data) };
  } catch(err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};

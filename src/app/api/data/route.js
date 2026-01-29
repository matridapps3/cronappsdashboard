import newPool from '../../../dbConfig/db.js'


export async function GET(){
  try{
      const query = "select app_name from app_list_for_dashboard"
      const result = await newPool.query(query)
      return Response.json(result.rows)
  }
  catch(err){
      console.log(err);
      return Response.json({message:'Error', err});
  }
}
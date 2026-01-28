import newPool from '../../../../dbConfig/db.js'

export async function GET(request){
    try{
        const { searchParams } = new URL(request.url);
        const appName = searchParams.get('app');
        
        if (!appName) {
            return Response.json({ error: 'App name required' }, { status: 400 });
        }
        
        const query = "SELECT * FROM job_runs_new WHERE app_name = $1 ORDER BY started_at DESC";
        const result = await newPool.query(query, [appName]);
        return Response.json({ data: result.rows });
    }
    catch(err){
        console.log(err);
        return Response.json({ message: 'Error', err }, { status: 500 });
    }
}
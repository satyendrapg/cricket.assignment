<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use App\Repositories\Interfaces\TeamRepositoryInterface;
use App\Models\Team;
use App\Models\Match;

class TeamsController extends Controller
{
    protected $team;

    /**
     * TeamsController constructor.
     *
     * @param TeamRepositoryInterface $team
     */
    public function __construct(TeamRepositoryInterface $team)
    {
        $this->team = $team;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $teams =   $this->team->all();
        return response()->json($teams);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //validate input form data
        $this->_validateFormData($request);
        //upload team logo
        $filename = $this->_uploadImage($request);
        //store team in table
        $team = new Team([
            'name' => $request->post('name'),
            'logoUri' => $filename,
            'clubState' => $request->post('clubState')
        ]);

        $team->save();
        return response()->json('success');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $team = $this->team->get($id);
        $teams = ['team'=>$team,'players'=>$team->players]; //dd($teams);
        return response()->json($teams);
    }

    /**
     * Show the form for editing the specified resource.     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $teams = $this->team->get($id);
        return response()->json($teams);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $team = Team::find($id);
        //validate input data
        $this->_validateFormData($request,false);
        $team->name = $request->post('name');
        $team->clubState = $request->post('clubState');
        //upload team logo
        if($request->file('logoUri')!=''){
            $team->logoUri = $this->_uploadImage($request);
        }
        //store teams
        $team->update();

        return response()->json('success');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->team->delete($id);
        return response()->json('success');
    }

    /**
     * Validate input data
     */
    private function _validateFormData(Request $request,$file=TRUE){

        $rules = [
            'name'=>'required|min:3|max:255',
            'clubState'=>'required|min:3|max:255',
        ];

        if($file){
            $rules['logoUri']  = 'required|mimes:png,jpg,jpeg,gif|max:2048';
        }
        return $request->validate($rules);

    }

    /**
     * Upload image
     */
    private function _uploadImage(Request $request){
        $uploadImage = $request->file('logoUri');
        $filename = time().$uploadImage->getClientOriginalName();

        Storage::disk('local')->putFileAs(
            'public/teams/',
            $uploadImage,
            $filename
        );
        return $filename;
    }

    /**
     * Get all match fixtures and their results
     */
    public function matches()
    {
        $matches = $this->team->getMatches();
        return response()->json($matches);
    }

    /**
     * Get all team points
     */
    public function points()
    {
        $points = $this->team->getPoints();
        return response()->json($points);
    }
}

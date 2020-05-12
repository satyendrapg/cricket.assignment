<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Interfaces\PlayerRepositoryInterface;
use App\Models\Player;
use App\Models\Team;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class PlayersController extends Controller
{
    protected $player;

    /**
     * PlayersController constructor.
     *
     * @param PlayerRepositoryInterface $player
     */
    public function __construct(PlayerRepositoryInterface $player)
    {
        $this->player = $player;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $players =  $this->player->all();
        return response()->json($players);
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
        DB::enableQueryLog();
        //validate form data
        $this->_validateFormData($request);
        //upload file
        $filename = $this->_uploadImage($request);
        //store teams
        $player = new Player(array_merge($request->post(),['imageUri'=>$filename]));
        $player->save();
        //dd(DB::getQueryLog());
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
        $player = $this->player->get($id);
        return response()->json($player);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $player = $this->player->get($id);
        $data['player'] = $player;
        $data['teamList'] = Team::all();
        return response()->json($data);
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
        //validate form input data
        $this->_validateFormData($request,false);

        $player =  Player::find($id);
        $player->firstName = $request->post('firstName');
        $player->lastName = $request->post('lastName');
        $player->teamId = $request->post('teamId');
        $player->country = $request->post('country');
        $player->jerseyNumber = $request->post('jerseyNumber');
        $player->matches = $request->post('matches');
        $player->runs = $request->post('runs');
        $player->highestScores = $request->post('highestScores');
        $player->fifties = $request->post('fifties');
        $player->hundreds = $request->post('hundreds');
        //upload image
        if($request->file('imageUri')){
            $player->image = $this->_uploadImage($request);
        }
        //store player data
        $player->update();
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
        $team = Player::find($id);
        $team->delete();
    }

    /**
     * Validate input form data
     */
    private function _validateFormData(Request $request, $file=TRUE){
        $rules = [
            'teamId'=>'required',
            'firstName'=>'required',
        ];

        if($file){
            $rules['imageUri']  = 'required|mimes:png,jpg,jpeg,gif|max:2048';
        }
        return $request->validate($rules);

    }

    private function _uploadImage(Request $request){
        $uploadImage = $request->file('imageUri');
        $filename = time().$uploadImage->getClientOriginalName();

        Storage::disk('local')->putFileAs(
            'public/players/',
            $uploadImage,
            $filename
        );
        return $filename;
    }
}
